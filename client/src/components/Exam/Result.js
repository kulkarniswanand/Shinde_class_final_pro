import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  console.log("Result component mounted"); // Debugging component rendering
  const location = useLocation();
  const navigate = useNavigate();
  const [exam, setExam] = useState(() => {
    const storedExam = localStorage.getItem("examData");
    console.log("Stored Exam Data:", storedExam); // Debugging local storage
    return storedExam ? JSON.parse(storedExam) : location.state?.exam || null;
  });
  const [loading, setLoading] = useState(!exam);

  useEffect(() => {
    if (!exam) {
      const fetchExamResults = async () => {
        try {
          console.log("Fetching exam results...");
          const response = await fetch("/api/exams/exam_answers"); // Replace with actual API endpoint
          console.log("Response Status:", response.status);
          if (!response.ok) throw new Error("Failed to fetch exam results");
          const data = await response.json();
          console.log("Fetched Exam Data:", data); // Debugging API response

          // Map user answers to the corresponding questions
          const questionsWithAnswers = data.questions.map((question) => {
            const answerData = data.answers.find((answer) => answer.questionId === question.id);
            console.log("Answer Data for Question:", question.id, answerData); // Debugging mapping logic
            const userAnswer = answerData?.answer || "No answer";
            const isCorrect = answerData?.is_correct === 1;
            return { ...question, userAnswer, isCorrect };
          });
          console.log("Mapped Questions with Answers:", questionsWithAnswers); // Debugging mapped questions

          const updatedExam = { ...data, questions: questionsWithAnswers };
          setExam(updatedExam);
          localStorage.setItem("examData", JSON.stringify(updatedExam)); // Store in local storage
          console.log("Exam Data Stored in Local Storage:", updatedExam); // Debugging local storage update
        } catch (error) {
          console.error("Error fetching exam results:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchExamResults();
    }
  }, [exam]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading exam results...</p>
      </div>
    );
  }

  if (!exam) {
    console.log("Exam object is null or undefined"); // Debugging rendering logic
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No exam data available. Please go back.</p>
        <button
          onClick={() => navigate(-1)}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  const percentage = Math.round((exam.score / exam.totalMarks) * 100);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Exam Results</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className={`h-2 ${percentage >= 80 ? "bg-green-500" : percentage >= 60 ? "bg-yellow-500" : "bg-red-500"}`}></div>
          <div className="text-center my-6">
            <h3 className="text-3xl font-bold">{exam.score} / {exam.totalMarks}</h3>
            <p className={`text-lg ${percentage >= 80 ? "text-green-600" : percentage >= 60 ? "text-yellow-600" : "text-red-600"}`}>
              {percentage}% - {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good effort!" : "Needs improvement"}
            </p>
          </div>
          <div className="space-y-6">
            {exam.questions.map((question, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">Q{idx + 1}</span>
                    <span className={`text-sm px-2 py-1 rounded ${question.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {question.isCorrect ? "Correct" : "Incorrect"} ({question.marks} marks)
                    </span>
                  </div>
                </div>
                <p className="font-medium mt-2">{question.question}</p>
                <p className="text-sm">Correct answer: <span className="text-green-600">{question.correctAnswer}</span></p>
                <p className="text-sm">
                  Your answer:{" "}
                  <span className={question.isCorrect ? "text-green-600" : "text-red-600"}>
                    {question.userAnswer}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;


