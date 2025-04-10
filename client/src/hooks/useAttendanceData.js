import { useState, useEffect, useCallback } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { websocketService } from '../services/Services';

export function useAttendanceData() {
    const { state, dispatch } = useAttendance();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch data with caching
    const fetchData = useCallback(async (endpoint, actionType) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dispatch({ type: actionType, payload: data });
        } catch (err) {
            setError(err.message);
            console.error(`Error fetching ${endpoint}:`, err);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    // Mark attendance with optimistic updates
    const markAttendance = useCallback(async (studentId, status) => {
        try {
            // Optimistic update
            const newRecord = {
                id: studentId,
                status,
                date: state.selectedDate,
                timestamp: new Date().toISOString()
            };

            dispatch({ type: 'MARK_ATTENDANCE', payload: newRecord });

            // Send to server
            const response = await fetch('/api/studentAttendance/mark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecord),
            });

            if (!response.ok) {
                throw new Error('Failed to mark attendance');
            }

            // Broadcast update via WebSocket
            websocketService.send('ATTENDANCE_UPDATED', newRecord);
        } catch (err) {
            setError(err.message);
            // Revert optimistic update on error
            dispatch({ type: 'REVERT_ATTENDANCE', payload: studentId });
        }
    }, [state.selectedDate, dispatch]);

    // Subscribe to WebSocket updates
    useEffect(() => {
        const unsubscribe = websocketService.subscribe('ATTENDANCE_UPDATED', (data) => {
            dispatch({ type: 'MARK_ATTENDANCE', payload: data });
        });

        return () => unsubscribe();
    }, [dispatch]);

    // Fetch initial data
    useEffect(() => {
        fetchData('/api/classes', 'SET_CLASSES');
        fetchData('/api/students', 'SET_STUDENTS');
        fetchData('/api/studentAttendance/records', 'SET_ATTENDANCE_RECORDS');
    }, [fetchData]);

    return {
        state,
        isLoading,
        error,
        markAttendance,
        fetchData
    };
} 