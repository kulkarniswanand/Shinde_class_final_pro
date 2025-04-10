import React from 'react';
import { useAttendance } from '../../context/AttendanceContext';

const AttendanceDashboard = () => {
    const { state } = useAttendance();
    const { stats } = state;

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Students</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalStudents || 0}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Present</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.presentCount || 0}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Absent</h3>
                    <p className="text-3xl font-bold text-red-600">{stats.absentCount || 0}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Attendance Rate</h3>
                    <p className="text-3xl font-bold text-purple-600">{stats.attendanceRate || 0}%</p>
                </div>
            </div>
        </div>
    );
};

export default AttendanceDashboard; 