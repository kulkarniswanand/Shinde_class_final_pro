import React from 'react';
import { useAttendance } from '../../context/AttendanceContext';

const ClassRoster = ({ onMarkAttendance }) => {
    const { state, dispatch } = useAttendance();
    const { students, selectedClass, searchTerm } = state;

    // Filter students based on selected class and search term
    const filteredStudents = students.filter(student => {
        const matchesClass = selectedClass === 0 || student.class === selectedClass;
        const matchesSearch = !searchTerm || 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNo.toString().includes(searchTerm);
        return matchesClass && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Class Roster</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
                    />
                    <select
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedClass}
                        onChange={(e) => dispatch({ type: 'SET_SELECTED_CLASS', payload: Number(e.target.value) })}
                    >
                        <option value={0}>All Classes</option>
                        {state.classes.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStudents.map(student => (
                    <div key={student.id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                                <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onMarkAttendance(student.id, 'present')}
                                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Present
                                </button>
                                <button
                                    onClick={() => onMarkAttendance(student.id, 'absent')}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Absent
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassRoster; 