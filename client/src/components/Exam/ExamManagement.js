import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({ name: "", date: "", duration: "", standard: "" });
  const [activeTab, setActiveTab] = useState("student"); // Tab state
  const [newQuestion, setNewQuestion] = useState({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 5,
  });
  const [newExamQuestions, setNewExamQuestions] = useState([]);
  const [showCreateExam, setShowCreateExam] = useState(false); // Toggle for create exam module
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examPortalOpen, setExamPortalOpen] = useState(false); // State to toggle exam portal
  const [editExamData, setEditExamData] = useState(null); // State to hold the exam being edited

  // Fetch exams from the database
  const fetchExams = async () => {
    try {
        const response = await fetch("/api/exams");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log("Fetched exams:", data);
        setExams(data); // Update the exams state
    } catch (error) {
        console.error("Error fetching exams:", error);
    }
};

// Call fetchExams on component mount
useEffect(() => {
    fetchExams();
}, []);

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

        // Reset form and questions
        setFormData({ name: "", date: "", duration: "", standard: "", subject: "" });
        setNewExamQuestions([]);

        // Fetch updated exams and switch to student mode
        fetchExams(); // Refresh exams data
        setActiveTab("student"); // Switch to student mode
        setShowCreateExam(false); // Close create exam module
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

  const handleEditExam = (id, updatedExam) => {
    setExams(exams.map((exam) => (exam.id === id ? { ...exam, ...updatedExam } : exam)));
  };

  const startExam = (exam) => {
    // Ensure questions are parsed correctly
    const questions = Array.isArray(exam.questions) ? exam.questions : JSON.parse(exam.questions || "[]");

    if (!questions || questions.length === 0) {
        alert("This exam has no questions. Please contact your teacher.");
        return;
    }

    setCurrentExam({ ...exam, questions });
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
    const answersData = currentExam.questions.map((question) => ({
        examId: currentExam.id,
        questionId: question.id,
        studentId: 1, // Replace with the actual student ID
        answer: examAnswers[question.id] || "",
        isCorrect: examAnswers[question.id] === question.correctAnswer,
        marksObtained: examAnswers[question.id] === question.correctAnswer ? question.marks : 0,
    }));

    try {
        const response = await fetch("/api/exams/submit-answers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answersData),
        });

        if (!response.ok) throw new Error("Failed to submit exam answers");

        const data = await response.json();
        console.log("Exam answers submitted successfully:", data);
        alert("Exam submitted successfully!");
        setExamPortalOpen(false);
        setCurrentExam(null);
    } catch (error) {
        console.error("Error submitting exam answers:", error);
    }
};

  const handleEditExamClick = (exam) => {
    setEditExamData(exam); // Set the exam to be edited
  };

  const handleEditExamChange = (e) => {
    const { name, value } = e.target;
    setEditExamData({ ...editExamData, [name]: value }); // Update the exam data
  };

  const handleSaveEditedExam = async () => {
    try {
        const response = await fetch(`/api/exams/${editExamData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editExamData),
        });

        if (!response.ok) throw new Error("Failed to update exam");

        setExams(exams.map((exam) => (exam.id === editExamData.id ? editExamData : exam)));
        setEditExamData(null);
        alert("Exam updated successfully!");
    } catch (error) {
        console.error("Error updating exam:", error);
    }
};

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white font-bold rounded-lg p-2 text-xl">SC</div>
            <h1 className="text-xl font-bold text-gray-800">Shinde Classes</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveTab("student");
                setShowCreateExam(false);
              }}
              className={`px-4 py-2 rounded-l-lg ${activeTab === "student" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
              Student Mode
            </button>
            <button
              onClick={() => {
                setActiveTab("teacher");
                setShowCreateExam(false);
              }}
              className={`px-4 py-2 rounded-r-lg ${activeTab === "teacher" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
              Teacher Mode
            </button>
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Go to Dashboard Button */}
        {/* <div className="flex justify-end">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Go to Dashboard
          </button>
        </div> */}
        {/* Student Mode */}
        {activeTab === "student" && !examPortalOpen && (
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, Student Name</h1>
            <p className="text-gray-600">Class 8</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Upcoming Exams */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Exams</h3>
                <p className="text-gray-600 mb-6">Exams scheduled in the near future</p>
                {exams.filter((exam) => exam.status === "upcoming").length > 0 ? (
                  exams
                    .filter((exam) => exam.status === "upcoming")
                    .map((exam) => (
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
                        </div>
                        {/* Buttons */}
                        <div className="flex gap-4">
                          {activeTab === "student" && (
                            <button
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                              onClick={() => startExam(exam)} // Open exam portal
                            >
                              Start Exam
                            </button>
                          )}
                        </div>
                      </div>
                    ))
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
                      .map((exam) => (
                        <li key={exam.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-700">{exam.name}</h4>
                            <p className="text-gray-600">Subject: {exam.subject}</p>
                            <p className="text-gray-600">Class: {exam.standard}</p>
                            {activeTab === "teacher" && (
                              <p className="text-gray-600">Score: {exam.score}/{exam.totalMarks}</p>
                            )}
                          </div>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                            onClick={() => {
                              alert("View results functionality not implemented yet.");
                            }}
                          >
                            View Results
                          </button>
                        </li>
                      ))}
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
        {/* Teacher Mode */}
        {activeTab === "teacher" && (
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
            {!showCreateExam ? (
              <div>
                {/* Buttons Row */}
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={() => setShowCreateExam(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all" style={{ marginLeft: "auto" }}
                  >
                    Create New Exam
                  </button>
                  {/* <button
                    onClick={() => navigate("/admin-dashboard")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Go to Dashboard
                  </button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Upcoming Exams */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Exams</h3>
                    <p className="text-gray-600 mb-6">Exams scheduled in the near future</p>
                    {exams.filter((exam) => exam.status === "upcoming").length > 0 ? (
                      <ul className="space-y-6">
                        {exams
                          .filter((exam) => exam.status === "upcoming")
                          .map((exam) => (
                            <li key={exam.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-700">{exam.name}</h4>
                                <p className="text-gray-600">Subject: {exam.subject}</p>
                                <p className="text-gray-600">Class: {exam.standard}</p>
                                <p className="text-gray-600">
                                  Due: {exam.date ? new Date(exam.date).toLocaleString() : "Not Set"}
                                </p>
                                <p className="text-gray-600">Duration: {exam.duration} minutes</p>
                              </div>
                              <div className="flex gap-4">
                                <button
                                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                                  onClick={() => handleEditExamClick(exam)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                                  onClick={() => handleDeleteExam(exam.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                      </ul>
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
                          .map((exam) => (
                            <li key={exam.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-700">{exam.name}</h4>
                                <p className="text-gray-600">Subject: {exam.subject}</p>
                                <p className="text-gray-600">Class: {exam.standard}</p>
                                <p className="text-gray-600">Score: {exam.score}/{exam.totalMarks}</p>
                              </div>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                                onClick={() => {
                                  alert("View results functionality not implemented yet.");
                                }}
                              >
                                View Results
                              </button>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No completed exams available.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Create New Exam</h2>
                {/* Create Exam Module */}
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={() => setShowCreateExam(false)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all"
                  >
                    Back to Dashboard
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Exam Details Section */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Exam Details</h3>
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Exam Title</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Exam Title"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Subject</label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select subject</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            <option value="English">English</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Class</label>
                          <select
                            name="standard"
                            value={formData.standard}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select class</option>
                            <option value="8th">8th</option>
                            <option value="9th">9th</option>
                            <option value="10th">10th</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Duration (minutes)</label>
                          <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            placeholder="60"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Total Marks</label>
                          <input
                            type="number"
                            name="totalMarks"
                            value={formData.totalMarks}
                            onChange={handleInputChange}
                            placeholder="100"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Due Date & Time</label>
                        <input
                          type="datetime-local"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </form>
                  </div>
                  {/* Add Questions Section */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Questions</h3>
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Question Type</label>
                        <select
                          value={newQuestion.type}
                          onChange={(e) => {
                            setNewQuestion({
                              ...newQuestion,
                              type: e.target.value,
                              options: e.target.value === "multiple-choice" ? ["", "", "", ""] : [],
                              correctAnswer: "",
                            });
                          }}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="true-false">True/False</option>
                          <option value="short-answer">Short Answer</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Question</label>
                        <textarea
                          value={newQuestion.question}
                          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                          placeholder="Enter your question here"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {newQuestion.type === "multiple-choice" && (
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">Options</label>
                          {newQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const updatedOptions = [...newQuestion.options];
                                  updatedOptions[index] = e.target.value;
                                  setNewQuestion({ ...newQuestion, options: updatedOptions });
                                }}
                                placeholder={`Option ${index + 1}`}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={newQuestion.correctAnswer === option}
                                onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: option })}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {newQuestion.type === "true-false" && (
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">Correct Answer</label>
                          <div className="flex items-center gap-4">
                            <label>
                              <input
                                type="radio"
                                name="true-false"
                                value="true"
                                checked={newQuestion.correctAnswer === "true"}
                                onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: "true" })}
                              />
                              True
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="true-false"
                                value="false"
                                checked={newQuestion.correctAnswer === "false"}
                                onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: "false" })}
                              />
                              False
                            </label>
                          </div>
                        </div>
                      )}
                      {newQuestion.type === "short-answer" && (
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">Correct Answer</label>
                          <input
                            type="text"
                            value={newQuestion.correctAnswer}
                            onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                            placeholder="Enter the correct answer"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Marks</label>
                        <input
                          type="number"
                          value={newQuestion.marks}
                          onChange={(e) => setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) || 1 })}
                          placeholder="Marks"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                      >
                        Add Question
                      </button>
                    </form>
                  </div>
                </div>
                {/* Questions Added Section */}
                <div className="bg-white p-8 rounded-lg shadow-md mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Questions Added ({newExamQuestions.length})</h3>
                  <p className="text-gray-600 mb-6">
                    Total Marks: {newExamQuestions.reduce((total, q) => total + q.marks, 0)} <br />
                    Due Date & Time: {formData.date ? new Date(formData.date).toLocaleString() : "Not Set"}<br />
                    Duration (minutes): {formData.duration || "Not Set"}
                  </p>
                  {newExamQuestions.length > 0 ? (
                    <ul className="space-y-6 divide-y">
                      {newExamQuestions.map((q, idx) => (
                        <li key={idx} className="pt-4 first:pt-0">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">Q{idx + 1}</span>
                                <span className="text-sm text-gray-500">{q.type} · {q.marks} marks</span>
                              </div>
                              <p className="font-medium">{q.question}</p>
                              {q.type === "multiple-choice" && (
                                <ul className="ml-5 list-disc space-y-1 text-sm">
                                  {q.options.map((opt, i) => (
                                    <li
                                      key={i}
                                      className={opt === q.correctAnswer ? "text-green-600 font-medium" : ""}
                                    >
                                      {opt} {opt === q.correctAnswer && "(Correct)"}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {q.type === "true-false" && (
                                <p className="text-sm text-green-600">Correct answer: {q.correctAnswer}</p>
                              )}
                              {q.type === "short-answer" && (
                                <p className="text-sm text-green-600">Correct answer: {q.correctAnswer}</p>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                const updatedQuestions = newExamQuestions.filter((_, i) => i !== idx);
                                setNewExamQuestions(updatedQuestions);
                              }}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No questions added yet</p>
                  )}
                  {/* Create Exam Button */}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleAddExam}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
                    >
                      Create Exam
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Edit Exam Form */}
        {editExamData && (
          <div className="bg-white p-8 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Exam</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Exam Title</label>
                <input
                  type="text"
                  name="name"
                  value={editExamData.name}
                  onChange={handleEditExamChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={editExamData.subject}
                    onChange={handleEditExamChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Class</label>
                  <input
                    type="text"
                    name="standard"
                    value={editExamData.standard}
                    onChange={handleEditExamChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={editExamData.duration}
                    onChange={handleEditExamChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Due Date</label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={editExamData.date}
                    onChange={handleEditExamChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditExamData(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditedExam}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamManagement;