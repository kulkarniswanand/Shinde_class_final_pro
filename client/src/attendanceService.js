import axios from 'axios';
import config from '../config';

// Create a configured Axios instance with defaults
const api = axios.create({
  baseURL: `${config.API_BASE_URL}/api`,
  timeout: 15000, // 15 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for cleaner error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API request failed:', error.message); 
    
    // Store original request config
    const originalRequest = error.config;
    
    // If this is a timeout or network error and we haven't retried yet
    if ((error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('Network Error')) 
        && !originalRequest._retry) {
      console.log('Retrying request due to timeout/network error...');
      
      // Mark as retried
      originalRequest._retry = true;
      
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return the retry attempt
      return api(originalRequest);
    }
    
    // If we got here, the request failed even after retry, so propagate the error
    return Promise.reject(error);
  }
);

// Helper for failed API responses with typed fallbacks
const handleApiError = (error, fallback, logMessage = 'API Error') => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(`${logMessage}: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error(`${logMessage}: No response received - ${error.message}`);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(`${logMessage}: ${error.message}`);
  }
  
  // Return the fallback data
  return fallback;
};

// Get all students
export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data || [];
  } catch (error) {
    return handleApiError(error, [], 'Error fetching students');
  }
};

// Get all classes
export const getClasses = async () => {
  try {
    const response = await api.get('/attendance/classes');
    return response.data || [];
  } catch (error) {
    // Fallback to mock classes if API fails
    console.error('Error fetching classes:', error.message);
    return [
      { id: 1, name: "10th", course_code: "10th" },
      { id: 2, name: "9th", course_code: "9th" },
      { id: 3, name: "8th", course_code: "8th" }
    ];
  }
};

// Get all branches
export const getBranches = async () => {
  try {
    const response = await api.get('/attendance/branches');
    return response.data || [];
  } catch (error) {
    return handleApiError(error, ["science", "commerce", "kadegaon", "cs"], 'Error fetching branches');
  }
};

// Mark student attendance
export const markAttendance = async (attendanceData) => {
  try {
    // Validate the incoming data object
    const { studentId, name, studentClass, branch, date, status } = attendanceData;
    if (!studentId || !name || !studentClass || !branch || !date || !status) {
        console.error("Missing required fields in attendanceData:", attendanceData);
        return { success: false, message: "Missing required attendance data fields (studentId, name, studentClass, branch, date, status)" };
    }

    console.log(`Marking attendance with data:`, attendanceData);

    // Send the validated data object directly
    // Corrected endpoint URL:
    const response = await api.post('/studentAttendance/mark', attendanceData);

    console.log("Attendance API responded:", response.status, response.data);
    return response.data; // Should return { message: '...' } on success
  } catch (error) {
    console.error('Error in markAttendance:', error.message);
    
    // Return structured error
    return { 
      success: false, 
      message: error.response?.data?.message || error.message || 'Error marking attendance'
    };
  }
};

// Toggle student attendance status
export const toggleAttendanceStatus = async (studentId, date) => {
  try {
    console.log(`Toggling attendance status: Student=${studentId}, Date=${date}`);
    
    if (!studentId || !date) {
      console.error("Missing required parameters");
      return { success: false, message: "Missing required parameters" };
    }
    
    const response = await api.post('/attendance/toggle', { studentId, date });
    console.log("Toggle API responded:", response.status, response.data);
    return response.data;
  } catch (error) {
    console.error('Error in toggleAttendanceStatus:', error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || error.message || 'Error toggling attendance status'
    };
  }
};

// Get attendance records by class and date
export const getAttendanceByClassAndDate = async (className, date) => {
  try {
    if (!className || !date) {
      console.error("Missing required parameters for attendance lookup");
      return [];
    }
    
    console.log(`Fetching attendance for class=${className}, date=${date}`);
    
    const response = await api.get(`/attendance`, {
      params: {
        className,
        date
      }
    });
    
    console.log("Attendance response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching attendance by class and date:', error.message);
    
    // If the first endpoint fails, try the alternative endpoint
    try {
      console.log("Trying alternative endpoint...");
      
      const altResponse = await api.get(`/attendance/byclass`, {
        params: {
          class: className,
          date
        }
      });
      
      console.log("Alternative endpoint response:", altResponse.data);
      return altResponse.data || [];
    } catch (altError) {
      console.error("Alternative endpoint also failed:", altError.message);
      return [];
    }
  }
};

// Get attendance history
export const getAttendanceHistory = async (startDate, endDate, className = null, branch = null) => {
  try {
    const params = { startDate, endDate };
    if (className) params.className = className;
    if (branch) params.branch = branch;
    
    const response = await api.get('/attendance/history', { params });
    return response.data || [];
  } catch (error) {
    return handleApiError(error, [], 'Error fetching attendance history');
  }
};

// Get attendance stats
export const getAttendanceStats = async (className = null, date = null) => {
  try {
    const params = {};
    if (className) params.className = className;
    if (date) params.date = date;
    
    const response = await api.get('/attendance/stats', { params });
    return response.data || { 
      total_students: 0, 
      present_count: 0,
      absent_count: 0,
      unrecorded_count: 0
    };
  } catch (error) {
    return handleApiError(error, { 
      total_students: 0, 
      present_count: 0,
      absent_count: 0,
      unrecorded_count: 0
    }, 'Error fetching attendance stats');
  }
};

// Get students by class
export const getStudentsByClass = async (className) => {
  try {
    if (!className) {
      console.error("Missing className parameter");
      return [];
    }
    
    const response = await api.get(`/attendance/students/class/${className}`);
    return response.data || [];
  } catch (error) {
    // Try getting all students if class-specific endpoint fails
    try {
      console.log("Attempting to get all students and filter by class...");
      const allStudents = await getStudents();
      return allStudents.filter(s => s.class === className);
    } catch (fallbackError) {
      console.error("Both endpoints failed:", fallbackError.message);
      return [];
    }
  }
};

// Mark attendance for multiple students
export const markBatchAttendance = async (students, className, branch, date) => {
  try {
    if (!students || !Array.isArray(students) || students.length === 0) {
      console.error("Missing or invalid students array");
      return { success: false, message: "Invalid students data" };
    }
    
    const requestData = {
      students,
      className,
      branch,
      date: date || new Date().toISOString().split('T')[0]
    };
    
    console.log(`Marking batch attendance for ${students.length} students`);
    
    const response = await api.post('/attendance/mark-batch', requestData);
    return response.data;
  } catch (error) {
    console.error('Error in batch attendance:', error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || error.message || 'Error marking batch attendance'
    };
  }
};

// Mock implementation of getDailyAttendanceSummary
export const getDailyAttendanceSummary = async () => {
  return [
    {
      date: "2025-04-01",
      presentCount: 80,
      absentCount: 20,
      totalStudents: 100,
    },
    {
      date: "2025-04-02",
      presentCount: 85,
      absentCount: 15,
      totalStudents: 100,
    },
  ];
};