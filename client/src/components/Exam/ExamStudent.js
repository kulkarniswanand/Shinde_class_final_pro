import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ExamStudent = () => {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({ name: "", date: "", duration: "", standard: "" });
  const [newQuestion, setNewQuestion] = useState({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 5,
  }); 
  const [newExamQuestions, setNewExamQuestions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examPortalOpen, setExamPortalOpen] = useState(false); // State to toggle exam portal
  const [studentStandard, setStudentStandard] = useState(null);
  const [studentName, setStudentName] = useState('');

  // Fetch exams from the database
  const fetchExams = async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      // This case should ideally be caught by the auth check useEffect,
      // but good to have a safeguard.
      console.error("No logged in user found for fetching exams.");
      return;
    }

    const userData = JSON.parse(loggedInUser);
    const currentStudentStandard = userData.standard;

    if (!currentStudentStandard) {
      console.error("Student standard not found in localStorage.");
      // Potentially alert the user or handle this error appropriately
      return;
    }

    try {
      // Modify the fetch URL to include the student's standard as a query parameter.
      // The backend API (/api/exams) will need to be updated to handle this parameter
      // and filter exams accordingly.
      const response = await fetch(`/api/exams?standard=${encodeURIComponent(currentStudentStandard)}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Fetched exams:", data);
      setExams(data); // Update the exams state
    } catch (error) {
      console.error("Error fetching exams:", error);
      setExams([]); // Set to empty array on error to avoid rendering issues
    }
  };

  // Effect to check for authentication and then fetch exams
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      // If no user is logged in, redirect to the exam login page
      alert("You must be logged in to access the exam. Please login first.");
      navigate("/examstudentlogin");
    } else {
      const userData = JSON.parse(loggedInUser);
      if (userData.standard && userData.studentName) {
        setStudentStandard(userData.standard); // Set the student's standard
        setStudentName(userData.studentName); // Set the student's name
        fetchExams(); // Fetch exams only after confirming user and standard
      } else {
        alert("User data is incomplete (name or standard missing). Please login again.");
        localStorage.removeItem("loggedInUser"); // Clear incomplete data
        navigate("/examstudentlogin");
      }
    }
  }, [navigate]); // Add navigate to dependency array

  useEffect(() => {
    let timer;
    if (examStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, examStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExam = async (e) => {
    e.preventDefault();

    if (newExamQuestions.length === 0) {
      alert("Please add at least one question to the exam.");
      return;
    }

    const examData = {
      name: formData.name,
      subject: formData.subject,
      standard: formData.standard,
      date: formData.date,
      duration: formData.duration,
      totalMarks: newExamQuestions.reduce((total, q) => total + q.marks, 0),
      questions: newExamQuestions.map((q) => ({
        type: q.type,
        question: q.question,
        options: q.options.filter((opt) => opt.trim() !== ""), // Remove empty options
        correctAnswer: q.correctAnswer,
        marks: q.marks,
      })),
    };

    try {
      const response = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examData),
      });

      if (!response.ok) throw new Error("Failed to create exam");

      const data = await response.json();
      console.log("Exam created successfully:", data);

      // WhatsApp logic for exam details
      const whatsappMessage = `Exam Details:\nName: ${examData.name}\nSubject: ${examData.subject}\nClass: ${examData.standard}\nDate & Time: ${new Date(
        examData.date
      ).toLocaleString()}\nDuration: ${examData.duration} minutes\nTotal Marks: ${examData.totalMarks}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

      // Reset form and questions
      setFormData({ name: "", date: "", duration: "", standard: "", subject: "" });
      setNewExamQuestions([]);

      // Fetch updated exams
      fetchExams(); // Refresh exams data
      alert("Exam created successfully!");
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  const handleDeleteExam = async (id) => {
    try {
      const response = await fetch(`/api/exams/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete exam");

      setExams(exams.filter((exam) => exam.id !== id));
      alert("Exam deleted successfully!");
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleAddQuestion = () => {
    console.log("Current formData:", formData); // Debugging log to verify formData values

    if (
      !newQuestion.question ||
      (newQuestion.type === "multiple-choice" && newQuestion.options.some((opt) => !opt)) ||
      !newQuestion.correctAnswer
    ) {
      alert("Please fill all required fields for the question.");
      return;
    }

    // Validate "Due Date & Time" and "Duration (minutes)"
    if (!formData.date || !formData.duration) {
      alert("Please fill in 'Due Date & Time' and 'Duration (minutes)' in the 'Exam Details' section.");
      return;
    }

    const questionToAdd = {
      ...newQuestion,
      id: newExamQuestions.length + 1,
      duration: formData.duration, // Include duration
      dueDate: formData.date, // Include due date
    };

    setNewExamQuestions([...newExamQuestions, questionToAdd]);

    setNewQuestion({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 5,
    });
  };

  const startExam = (exam) => {
    // Ensure questions are parsed correctly
    // The backend returns questions as an array, which might be [{id: null, ...}] if no questions.
    const parsedQuestions = Array.isArray(exam.questions) ? exam.questions : JSON.parse(exam.questions || "[]");

    // Filter out placeholder null questions if present
    const actualQuestions = parsedQuestions.filter(q => q && q.id !== null);

    if (!actualQuestions || actualQuestions.length === 0) {
      alert("This exam is an announcement only or has no questions. It cannot be started.");
      return;
    }

    setCurrentExam({ ...exam, questions: actualQuestions }); // Use actualQuestions
    setCurrentQuestionIndex(0);
    setExamAnswers({});
    setTimeLeft(exam.duration * 60); // Set timeLeft in seconds based on exam duration
    setExamStarted(true); // Ensure the timer starts
    setExamPortalOpen(true);
  };
  const answerQuestion = (value) => {
    setExamAnswers({
      ...examAnswers,
      [currentExam.questions[currentQuestionIndex].id]: value,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = async () => {
    if (!currentExam) return;

    try {
      // Prepare answers data
      const answersData = currentExam.questions.map((question) => ({
        examId: currentExam.id,
        questionId: question.id,
        studentId: 1, // Replace with the actual student ID
        answer: examAnswers[question.id] || "",
        isCorrect: examAnswers[question.id] === question.correctAnswer,
        marks: question.marks,
      }));

      console.log("Submitting answers:", answersData); // Debugging log

      // Make API call to submit answers
      const response = await fetch("/api/exams/submit-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answersData),
      });

      console.log("Response Status:", response.status); // Debugging log
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData); // Log error response from the backend
        throw new Error("Failed to submit exam answers");
      }

      const data = await response.json();
      console.log("Exam answers submitted successfully:", data);

      // Refresh exams list to reflect the updated status
      fetchExams();

      alert("Exam submitted successfully!");
      setExamPortalOpen(false);
      setCurrentExam(null);
    } catch (error) {
      console.error("Error submitting exam answers:", error);
      alert("Failed to submit the exam. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-[90%] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white font-bold rounded-lg p-2 text-xl">SC</div>
            <h1 className="text-xl font-bold text-gray-800">Shinde Classes</h1>
          </div>
          <button
            onClick={() => navigate("/StudentDashboard")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-[90%] mx-auto px-6 py-8 space-y-8">
        {/* Student Mode */}
        {!examPortalOpen && (
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {studentName || 'Student'} {studentStandard ? `(Class ${studentStandard})` : ''}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Upcoming Exams */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Exams</h3>
                <p className="text-gray-600 mb-6">Exams scheduled in the near future</p>
                {exams.filter((exam) => exam.status === "upcoming").length > 0 ? (
                  exams
                    .filter((exam) => exam.status === "upcoming")
                    .map((exam) => {
                      // Check if the exam is an announcement (has no actual questions)
                      const isAnnouncement = !exam.questions || exam.questions.length === 0 || (exam.questions.length === 1 && exam.questions[0].id === null);
                      return (
                        <div key={exam.id} className="mb-6 p-4 border rounded-lg shadow-sm flex justify-between items-center">
                          {/* Exam Details */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-700">{exam.name}</h4>
                            <p className="text-gray-600">Subject: {exam.subject}</p>
                            <p className="text-gray-600">Standard: {exam.standard}</p>
                            <p className="text-gray-600">
                              Due: {exam.date ? new Date(exam.date).toLocaleString() : "Not Set"}
                            </p>
                            <p className="text-gray-600">Duration: {exam.duration} minutes</p>
                            {isAnnouncement && <p className="text-sm text-orange-500 italic mt-1">This is an exam announcement only.</p>}
                          </div>
                          {/* Buttons */}
                          <button
                            className={`px-4 py-2 rounded-lg transition-all ${
                              isAnnouncement
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                            onClick={() => !isAnnouncement && startExam(exam)}
                            disabled={isAnnouncement}
                            title={isAnnouncement ? "This is an announcement. Exam cannot be started." : "Start Exam"}
                          >
                            {isAnnouncement ? "Announcement" : "Start Exam"}
                          </button>
                        </div>
                      );
                    })
                ) : (
                  <p className="text-gray-500">No upcoming exams available.</p>
                )}
              </div>
              {/* Completed Exams */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Completed Exams</h3>
                <p className="text-gray-600 mb-6">View your past exam results</p>
                {exams.filter((exam) => exam.status === "completed").length > 0 ? (
                  <ul className="space-y-6">
                    {exams
                      .filter((exam) => exam.status === "completed")
                      .map((exam) => {
                        const score = parseFloat(exam.score) || 0;
                        const totalMarks = parseFloat(exam.totalMarks) || 0;
                        let percentage = 0;
                        if (totalMarks > 0) {
                          percentage = (score / totalMarks) * 100;
                        }
                        // Ensure percentage is between 0 and 100
                        percentage = Math.max(0, Math.min(100, percentage));

                        return (
                          <li key={exam.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-700">{exam.name}</h4>
                              <p className="text-gray-600">Subject: {exam.subject}</p>
                              <p className="text-gray-600">Class: {exam.standard}</p>
                              {/* <p className="text-gray-600">Score: {exam.score}/{exam.totalMarks}</p> */}
                              <p className="text-gray-600">Score: {score}/{totalMarks}</p>
                              {/* Progress Bar */}
                              <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium text-gray-700">
                                    Performance:  
                                  </span>
                                  <span className={`text-xs font-medium px-2 py-1 ml-1.5 rounded-full ${
                                    percentage >= 80
                                      ? "bg-green-100 text-green-800"
                                      : percentage >= 60
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {percentage.toFixed(0)}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${
                                      percentage >= 80
                                        ? "bg-green-500"
                                        : percentage >= 60
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                              onClick={() => navigate("/results", { state: { exam } })} // Pass exam data to /results
                            >
                              View Results
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                ) : (
                  <p className="text-gray-500">No completed exams available.</p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Exam Portal */}
        {examPortalOpen && currentExam && (
          <div className="space-y-5 mx-auto" style={{ width: "100%" }}>
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{currentExam.name}</h2>
                <p className="text-gray-600">{currentExam.subject} - Class {currentExam.standard}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono text-gray-800">{formatTime(timeLeft)}</div>
                <p className="text-sm text-gray-500">Time remaining</p>
              </div>
            </div>
            {/* Full-Width Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{
                  width: `${((currentQuestionIndex + 1) / currentExam.questions.length) * 100}%`,
                }}
              ></div>
            </div>
            {/* Question Progress */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-black">
                  Question {currentQuestionIndex + 1} of {currentExam.questions.length}
                </p>
                <p className="text-sm text-gray-500">
                  ({currentExam.questions[currentQuestionIndex].marks} marks)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-lg ${currentQuestionIndex === 0 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition-all`}
                >
                  Previous
                </button>
                <button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === currentExam.questions.length - 1}
                  className={`px-4 py-2 rounded-lg ${currentQuestionIndex === currentExam.questions.length - 1
                    ? "bg-gray-300 text-gray-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition-all`}
                >
                  Next
                </button>
              </div>
            </div>
            {/* Question Card */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-800">{currentExam.questions[currentQuestionIndex].question}</p>
              {currentExam.questions[currentQuestionIndex].type === "multiple-choice" && (
                <div className="mt-4 space-y-2">
                  {currentExam.questions[currentQuestionIndex].options.map((option, idx) => (
                    <label
                      key={idx}
                      className={`block p-3 border rounded-lg cursor-pointer ${examAnswers[currentExam.questions[currentQuestionIndex].id] === option
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentExam.questions[currentQuestionIndex].id}`}
                        value={option}
                        checked={examAnswers[currentExam.questions[currentQuestionIndex].id] === option}
                        onChange={() => answerQuestion(option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              {currentExam.questions[currentQuestionIndex].type === "true-false" && (
                <div className="mt-4 space-y-2">
                  <label
                    className={`block p-3 border rounded-lg cursor-pointer ${examAnswers[currentExam.questions[currentQuestionIndex].id] === "true"
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentExam.questions[currentQuestionIndex].id}`}
                      value="true"
                      checked={examAnswers[currentExam.questions[currentQuestionIndex].id] === "true"}
                      onChange={() => answerQuestion("true")}
                      className="mr-2"
                    />
                    True
                  </label>
                  <label
                    className={`block p-3 border rounded-lg cursor-pointer ${examAnswers[currentExam.questions[currentQuestionIndex].id] === "false"
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentExam.questions[currentQuestionIndex].id}`}
                      value="false"
                      checked={examAnswers[currentExam.questions[currentQuestionIndex].id] === "false"}
                      onChange={() => answerQuestion("false")}
                      className="mr-2"
                    />
                    False
                  </label>
                </div>
              )}
              {currentExam.questions[currentQuestionIndex].type === "short-answer" && (
                <textarea
                  value={examAnswers[currentExam.questions[currentQuestionIndex].id] || ""}
                  onChange={(e) => answerQuestion(e.target.value)}
                  placeholder="Write your answer here..."
                  className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            {/* Footer Section */}
            <div className="flex justify-between items-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                onClick={() => {
                  const confirmExit = window.confirm("Are you sure you want to exit the exam? Your progress will not be saved.");
                  if (confirmExit) {
                    setExamPortalOpen(false); // Close portal
                  }
                }}
              >
                Exit Exam
              </button>
              {/* Question Navigation */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  {currentExam.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border ${currentQuestionIndex === index
                        ? "border-black bg-gray-300" // Current question
                        : examAnswers[currentExam.questions[index].id]
                          ? "bg-green-100 border-green-500" // Answered question
                          : "bg-white border-gray-300" // Unanswered question
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                {/* Legend */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-green-100 border border-green-500 rounded-full"></span>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-gray-300 border border-black rounded-full"></span>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-white border border-gray-300 rounded-full"></span>
                    <span>Unanswered</span>
                  </div>
                </div>
              </div>
              <button
                onClick={currentQuestionIndex === currentExam.questions.length - 1 ? handleSubmitExam : goToNextQuestion}
                className={`px-4 py-2 rounded-lg ${currentQuestionIndex === currentExam.questions.length - 1
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition-all`}
              >
                {currentQuestionIndex === currentExam.questions.length - 1 ? "Submit Exam" : "Save & Continue"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}; 

export default ExamStudent;