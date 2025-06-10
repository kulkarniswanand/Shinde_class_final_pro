import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const dashboardOptions = [
  { id: 1, name: "Student Registration", image: "/images/Dashboard/student_registration.jpeg", route: "/StudentRegistrationForm" },
  // { id: 5, name: "Exam Schedule", image: "/images/Dashboard/Exam Schedule.jpg", route: "/ExamStudent" },
  { id: 5, name: "Exam Schedule", image: "/images/Dashboard/Exam Schedule.jpg", route: "/examstudentlogin" }, // This route leads to StudentExamLoginForm
  { id: 7, name: "Certificates", image: "/images/Dashboard/Certificates.jpg", route: "/certificates" },
  // { id: 9, name: "Results", image: "/images/Dashboard/Results.jpg", route: "/results" },
];
 
const StudentDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [studentName, setStudentName] = useState("Student");
  const [loginId, setLoginId] = useState(""); // This will store the actual login username (identifier)
  const [profileImage, setProfileImage] = useState("/images/default_profile.png");
  const [isUpdateProfileVisible, setIsUpdateProfileVisible] = useState(false);
  const [formData, setFormData] = useState({
    newUsername: "",
    // currentPassword: "", // Removed currentPassword
    newPassword: "",
  });
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.studentName) {
          setStudentName(user.studentName); // Set display name
          setFormData(prev => ({ ...prev, newUsername: user.studentName })); // Pre-fill form with display name
        }
        if (user && user.username) {
          setLoginId(user.username); // Set login identifier
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        // Handle error, maybe logout user or set default names
      }
    }
    if (storedProfileImage) setProfileImage(storedProfileImage);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const toggleProfileUpdateForm = () => {
    setIsUpdateProfileVisible(!isUpdateProfileVisible);
    setUpdateMessage({ type: "", text: "" }); // Clear previous messages
    setIsProfileMenuOpen(false); // Close the dropdown menu
    if (!isUpdateProfileVisible) { // If opening the form, prefill username
      // Pre-fill the 'newUsername' field with the current loginId, as this field will update the login username
      setFormData(prev => ({ 
        ...prev, 
        newUsername: loginId, // Pre-fill with current loginId
        // currentPassword: "", // Removed
        newPassword: "" // Reset newPassword field
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateMessage({ type: "", text: "" }); // Clear previous messages

    // if (!formData.currentPassword) { // Removed current password check
    //   setUpdateMessage({ type: "error", text: "Current password is required." });
    //   return;
    // }
    if (formData.newPassword && formData.newPassword.length > 0 && formData.newPassword.length < 6) { // Check length only if newPassword is not empty
        setUpdateMessage({ type: "error", text: "New password must be at least 6 characters." });
        return;
    }
 
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/student-dashboard/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUsername: loginId, // Send the current unique loginId to identify the student
          newUsername: formData.newUsername, // This is the new desired login username
          // currentPassword: formData.currentPassword, // Removed currentPassword from payload
          newPassword: formData.newPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update profile.");

      setUpdateMessage({ type: "success", text: data.message });
      
      // Update both loginId and studentName (display name) states with the new username
      setLoginId(formData.newUsername); 
      setStudentName(formData.newUsername); 

      // Update username (loginId) and studentName (display name) in localStorage's loggedInUser object
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          user.username = formData.newUsername; // Update the login username
          user.studentName = formData.newUsername; // Update the display name to match
          localStorage.setItem("loggedInUser", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to update user in localStorage", error);
        }
      }

      setTimeout(() => setIsUpdateProfileVisible(false), 2000); // Close form after 2s
    } catch (error) {
      setUpdateMessage({ type: "error", text: error.message });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Correct item to remove
    localStorage.removeItem("profileImage");
    // Potentially remove other auth-related items from localStorage if any (e.g., tokens)
    navigate("/login");
    setIsProfileMenuOpen(false); // Close the dropdown menu
  };

  const handleCancelUpdate = () => {
    setIsUpdateProfileVisible(false);
    setUpdateMessage({ type: "", text: "" });
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"
      } py-10 transition-colors duration-300`}
    >
      <div className="flex justify-between items-center px-10">
        <h1 className={`text-4xl font-extrabold tracking-wide ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>Student Dashboard</h1>

        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <img
              src={profileImage}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-500"
            />
            <p className={`ml-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{studentName}</p>
          </div>

          {isProfileMenuOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
            >
              <p className="px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer" onClick={toggleProfileUpdateForm}>Update Profile</p>
              <p className="px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer" onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-right px-10 mt-5">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full font-semibold ${isDarkMode ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "bg-gray-800 text-gray-100 hover:bg-gray-900"} transition-all duration-300`}
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {isUpdateProfileVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
            <form onSubmit={handleProfileUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="newUsername">New Username</label>
                <input
                  type="text"
                  id="newUsername"
                  name="newUsername"
                  value={formData.newUsername}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}`}
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}`}
                  required
                />
              </div> */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="newPassword">New Password (optional)</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current"
                  className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}`}
                />
              </div>
              {updateMessage.text && (
                <p className={`mb-4 text-sm text-center ${updateMessage.type === "success" ? (isDarkMode ? "text-green-400" : "text-green-600") : (isDarkMode ? "text-red-400" : "text-red-600")}`}>
                  {updateMessage.text}
                </p>
              )}
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={handleCancelUpdate} className={`px-4 py-2 rounded font-semibold ${isDarkMode ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-800"}`}>Cancel</button>
                <button type="submit" className={`px-4 py-2 rounded font-semibold ${isDarkMode ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {dashboardOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => navigate(option.route)} // Navigate to the correct route
            className={`flex flex-col items-center justify-center ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl p-6 hover:scale-105 transition-transform hover:shadow-xl cursor-pointer`}
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-20 h-20 object-contain mb-5 rounded-full border-4 border-gray-600"
            />
            <p className={`text-center text-lg font-semibold ${isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-800 hover:text-gray-600"}`}>{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
