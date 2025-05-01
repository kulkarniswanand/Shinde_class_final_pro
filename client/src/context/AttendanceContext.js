import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
    students: [],
    classes: [],
    attendanceRecords: [],
    selectedClass: 0,
    selectedDate: new Date().toISOString().split('T')[0],
    searchTerm: '',
    loading: false,
    error: null,
    stats: {
        totalStudents: 0,
        presentCount: 0,
        absentCount: 0,
        pendingCount: 0,
        attendanceRate: 0
    }
};

// Action types
const SET_STUDENTS = 'SET_STUDENTS';
const SET_CLASSES = 'SET_CLASSES';
const SET_ATTENDANCE_RECORDS = 'SET_ATTENDANCE_RECORDS';
const SET_SELECTED_CLASS = 'SET_SELECTED_CLASS';
const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const UPDATE_STATS = 'UPDATE_STATS';
const MARK_ATTENDANCE = 'MARK_ATTENDANCE';

// Reducer
function attendanceReducer(state, action) {
    switch (action.type) {
        case SET_STUDENTS:
            return { ...state, students: action.payload };
        case SET_CLASSES:
            return { ...state, classes: action.payload };
        case SET_ATTENDANCE_RECORDS:
            return { ...state, attendanceRecords: action.payload };
        case SET_SELECTED_CLASS:
            return { ...state, selectedClass: action.payload };
        case SET_SELECTED_DATE:
            return { ...state, selectedDate: action.payload };
        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case UPDATE_STATS:
            return { ...state, stats: action.payload };
        case MARK_ATTENDANCE:
            return {
                ...state,
                attendanceRecords: [...state.attendanceRecords, action.payload]
            };
        default:
            return state;
    }
}

// Create context
const AttendanceContext = createContext();

// Provider component
export function AttendanceProvider({ children }) {
    const [state, dispatch] = useReducer(attendanceReducer, initialState);

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                dispatch({ type: SET_LOADING, payload: true });
                
                // Fetch classes
                const classesResponse = await fetch('/api/classes');
                const classesData = await classesResponse.json();
                dispatch({ type: SET_CLASSES, payload: classesData });
                
                // Fetch students
                const studentsResponse = await fetch('/api/students');
                const studentsData = await studentsResponse.json();
                dispatch({ type: SET_STUDENTS, payload: studentsData });
                
                // Fetch attendance records
                const attendanceResponse = await fetch('/api/studentAttendance/records');
                const attendanceData = await attendanceResponse.json();
                dispatch({ type: SET_ATTENDANCE_RECORDS, payload: attendanceData });
                
                dispatch({ type: SET_LOADING, payload: false });
            } catch (error) {
                dispatch({ type: SET_ERROR, payload: error.message });
                dispatch({ type: SET_LOADING, payload: false });
            }
        };

        fetchInitialData();
    }, []);

    // Update stats when relevant data changes
    useEffect(() => {
        const updateStats = () => {
            const { students, attendanceRecords, selectedClass, selectedDate } = state;
            
            // Filter students by selected class
            const filteredStudents = selectedClass === 0 
                ? students 
                : students.filter(student => student.class === selectedClass);
            
            // Filter attendance records for selected date
            const todayRecords = attendanceRecords.filter(record => 
                record.date === selectedDate
            );
            
            // Calculate stats
            const totalStudents = filteredStudents.length;
            const presentCount = todayRecords.filter(r => r.status === 'present').length;
            const absentCount = todayRecords.filter(r => r.status === 'absent').length;
            const pendingCount = Math.max(0, totalStudents - presentCount - absentCount);
            const attendanceRate = totalStudents > 0 
                ? ((presentCount / totalStudents) * 100).toFixed(1) 
                : 0;
            
            dispatch({
                type: UPDATE_STATS,
                payload: {
                    totalStudents,
                    presentCount,
                    absentCount,
                    pendingCount,
                    attendanceRate
                }
            });
        };

        updateStats();
    }, [state.students, state.attendanceRecords, state.selectedClass, state.selectedDate]);

    return (
        <AttendanceContext.Provider value={{ state, dispatch }}>
            {children}
        </AttendanceContext.Provider>
    );
}

// Custom hook to use the context
export function useAttendance() {
    const context = useContext(AttendanceContext);
    if (!context) {
        throw new Error('useAttendance must be used within an AttendanceProvider');
    }
    return context;
} 