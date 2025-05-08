import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

// Remove TypeScript interfaces and use plain JavaScript objects
const Index = () => {
  const [userRole, setUserRole] = useState("student");
  const [activeView, setActiveView] = useState("dashboard");
  const [userName, setUserName] = useState("Student Name");
  const [userClass, setUserClass] = useState("Class 8");

  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Mathematics Mid-Term Exam",
      subject: "Mathematics",
      class: "8th",
      duration: 60,
      totalMarks: 50,
      dueDate: "2025-05-15T10:00:00",
      status: "upcoming",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "What is the value of π (pi) to two decimal places?",
          options: ["3.14", "3.15", "3.16", "3.17"],
          correctAnswer: "3.14",
          marks: 5,
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "Solve for x: 3x + 7 = 22",
          options: ["x = 5", "x = 7", "x = 8", "x = 15"],
          correctAnswer: "x = 5",
          marks: 5,
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "What is the area of a circle with radius 4 cm?",
          options: ["16π cm²", "8π cm²", "4π cm²", "2π cm²"],
          correctAnswer: "16π cm²",
          marks: 5,
        },
        {
          id: 4,
          type: "true-false",
          question: "The sum of interior angles of a triangle is 180 degrees.",
          correctAnswer: "true",
          marks: 5,
        },
        {
          id: 5,
          type: "short-answer",
          question: "If a = 5 and b = 3, calculate the value of a² + b².",
          correctAnswer: "34",
          marks: 10,
        }
      ]
    },
    {
      id: 2,
      title: "Science Term Exam",
      subject: "Science",
      class: "9th",
      duration: 90,
      totalMarks: 100,
      dueDate: "2025-05-20T14:00:00",
      status: "upcoming",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Which organelle is known as the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
          correctAnswer: "Mitochondria",
          marks: 5,
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: "Au", 
          marks: 5,
        }
      ]
    },
    {
      id: 3,
      title: "English Literature Quiz",
      subject: "English",
      class: "10th",
      duration: 45,
      totalMarks: 30,
      dueDate: "2025-05-10T09:00:00",
      status: "completed",
      score: 28,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
          correctAnswer: "William Shakespeare",
          userAnswer: "William Shakespeare",
          marks: 5,
        },
        {
          id: 2,
          type: "short-answer",
          question: "Name two main characters from 'To Kill a Mockingbird'.",
          correctAnswer: "Scout Finch, Atticus Finch",
          userAnswer: "Scout, Atticus",
          marks: 10,
        }
      ]
    },
  ]);

  const [newExam, setNewExam] = useState({
    title: "",
    subject: "",
    class: "",
    duration: 60,
    totalMarks: 100,
    dueDate: "",
    questions: [],
  });

  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 5,
  });

  useEffect(() => {
    let timer;
    if (examStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (examStarted && timeLeft === 0) {
      handleSubmitExam();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, examStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const startExam = (exam) => {
    setCurrentExam(exam);
    setTimeLeft(exam.duration * 60);
    setExamAnswers({});
    setCurrentQuestionIndex(0);
    setExamStarted(true);
    setActiveView("take-exam");
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

  const handleSubmitExam = () => {
    if (!currentExam) return;

    setExamStarted(false);

    let score = 0;
    let totalPossible = 0;

    currentExam.questions.forEach((question) => {
      totalPossible += question.marks;
      const userAnswer = examAnswers[question.id];

      if (userAnswer === question.correctAnswer) {
        score += question.marks;
      }
    });

    const updatedExams = exams.map((exam) => {
      if (exam.id === currentExam.id) {
        return {
          ...exam,
          status: "completed",
          score: score,
          totalPossible: totalPossible,
          userAnswers: examAnswers,
        };
      }
      return exam;
    });

    setExams(updatedExams);

    toast({
      title: "Exam Submitted",
      description: `You scored ${score}/${totalPossible}.`,
      duration: 5000,
    });

    setActiveView("results");
  };

  const addQuestion = () => {
    if (
      !newQuestion.question ||
      (newQuestion.type === "multiple-choice" && newQuestion.options.some((opt) => !opt)) ||
      !newQuestion.correctAnswer
    ) {
      toast({
        title: "Cannot add question",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }

    let typedQuestion;

    if (newQuestion.type === "multiple-choice") {
      typedQuestion = {
        id: newExam.questions.length + 1,
        type: "multiple-choice",
        question: newQuestion.question,
        options: [...newQuestion.options],
        correctAnswer: newQuestion.correctAnswer,
        marks: newQuestion.marks,
      };
    } else if (newQuestion.type === "true-false") {
      typedQuestion = {
        id: newExam.questions.length + 1,
        type: "true-false",
        question: newQuestion.question,
        correctAnswer: newQuestion.correctAnswer,
        marks: newQuestion.marks,
      };
    } else {
      typedQuestion = {
        id: newExam.questions.length + 1,
        type: "short-answer",
        question: newQuestion.question,
        correctAnswer: newQuestion.correctAnswer,
        marks: newQuestion.marks,
      };
    }

    setNewExam({
      ...newExam,
      questions: [...newExam.questions, typedQuestion],
    });

    setNewQuestion({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 5,
    });
  };

  const createExam = () => {
    if (!newExam.title || !newExam.subject || !newExam.class || !newExam.dueDate || newExam.questions.length === 0) {
      toast({
        title: "Cannot create exam",
        description: "Please fill all the required fields and add at least one question",
        variant: "destructive",
      });
      return;
    }

    const examToAdd = {
      ...newExam,
      id: exams.length + 1,
      status: "upcoming",
    };

    setExams([...exams, examToAdd]);

    toast({
      title: "Exam Created",
      description: "The exam has been successfully created.",
    });

    setNewExam({
      title: "",
      subject: "",
      class: "",
      duration: 60,
      totalMarks: 100,
      dueDate: "",
      questions: [],
    });

    setActiveView("dashboard");
  };

  // Dashboard component
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Welcome, {userName}</h2>
          <p className="text-slate-600">{userClass}</p>
        </div>
        
        {userRole === "teacher" && (
          <Button onClick={() => setActiveView("create-exam")} className="bg-emerald-600 hover:bg-emerald-700">
            Create New Exam
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Exams scheduled in the near future</CardDescription>
          </CardHeader>
          <CardContent>
            {exams.filter(exam => exam.status === "upcoming").length > 0 ? (
              <ul className="space-y-4">
                {exams 
                  .filter(exam => exam.status === "upcoming")
                  .map(exam => (
                    <li key={exam.id} className="border rounded-lg p-4 hover:bg-slate-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{exam.title}</h3>
                          <p className="text-sm text-slate-500">{exam.subject} - Class {exam.class}</p>
                          <p className="text-sm text-slate-500">
                            Due: {new Date(exam.dueDate).toLocaleDateString()} at {new Date(exam.dueDate).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-slate-500">Duration: {exam.duration} minutes</p>
                        </div>
                        {userRole === "student" && (
                          <Button onClick={() => startExam(exam)} variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">
                            Start Exam
                          </Button>
                        )}
                        {userRole === "teacher" && (
                          <div className="space-x-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              // Would typically open edit modal
                              toast({
                                title: "Edit functionality",
                                description: "This would open an edit form for the exam",
                              });
                            }}>
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600" onClick={() => {
                              const updatedExams = exams.filter(e => e.id !== exam.id);
                              setExams(updatedExams);
                              toast({
                                title: "Exam Deleted",
                                description: "The exam has been removed",
                              });
                            }}>
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-center py-4">No upcoming exams</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Completed Exams</CardTitle>
            <CardDescription>View your past exam results</CardDescription>
          </CardHeader>
          <CardContent>
            {exams.filter(exam => exam.status === "completed").length > 0 ? (
              <ul className="space-y-4">
                {exams
                  .filter(exam => exam.status === "completed")
                  .map(exam => (
                    <li key={exam.id} className="border rounded-lg p-4 hover:bg-slate-50 transition">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{exam.title}</h3>
                          <p className="text-sm text-slate-500">{exam.subject} - Class {exam.class}</p>
                          {userRole === "student" && exam.score !== undefined && (
                            <div className="mt-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Score: {exam.score}/{exam.totalMarks}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  (exam.score / exam.totalMarks) >= 0.8 
                                    ? "bg-green-100 text-green-800" 
                                    : (exam.score / exam.totalMarks) >= 0.6 
                                      ? "bg-yellow-100 text-yellow-800" 
                                      : "bg-red-100 text-red-800"
                                }`}>
                                  {Math.round((exam.score / exam.totalMarks) * 100)}%
                                </span>
                              </div>
                              <Progress 
                                className="h-2 mt-1" 
                                value={(exam.score / exam.totalMarks) * 100} 
                              />
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => {
                          setCurrentExam(exam);
                          setActiveView("results");
                        }}>
                          View Results
                        </Button>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-center py-4">No completed exams</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Create exam component
  const CreateExam = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Create New Exam</h2>
        <Button variant="outline" onClick={() => setActiveView("dashboard")}>
          Back to Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exam Title</Label>
                <Input 
                  id="title" 
                  value={newExam.title} 
                  onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    onValueChange={(value) => setNewExam({...newExam, subject: value})}
                    value={newExam.subject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Social Studies">Social Studies</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select 
                    onValueChange={(value) => setNewExam({...newExam, class: value})}
                    value={newExam.class}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8th">Class 8</SelectItem>
                      <SelectItem value="9th">Class 9</SelectItem>
                      <SelectItem value="10th">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    min="5" 
                    value={newExam.duration} 
                    onChange={(e) => setNewExam({...newExam, duration: parseInt(e.target.value) || 60})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input 
                    id="totalMarks" 
                    type="number" 
                    min="1" 
                    value={newExam.totalMarks} 
                    onChange={(e) => setNewExam({...newExam, totalMarks: parseInt(e.target.value) || 100})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date & Time</Label>
                <Input 
                  id="dueDate" 
                  type="datetime-local" 
                  value={newExam.dueDate} 
                  onChange={(e) => setNewExam({...newExam, dueDate: e.target.value})}
                />
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Add Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="questionType">Question Type</Label>
                <Select 
                  onValueChange={(value) => setNewQuestion({
                    ...newQuestion, 
                    type: value,
                    options: value === "multiple-choice" ? ["", "", "", ""] : [],
                    correctAnswer: ""
                  })}
                  value={newQuestion.type}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                    <SelectItem value="short-answer">Short Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea 
                  id="question" 
                  value={newQuestion.question} 
                  onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                  placeholder="Enter your question here"
                />
              </div>
              
              {newQuestion.type === "multiple-choice" && (
                <div className="space-y-3">
                  <Label>Answer Options</Label>
                  {newQuestion.options.map((option, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input 
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[idx] = e.target.value;
                          setNewQuestion({...newQuestion, options: newOptions});
                        }}
                        placeholder={`Option ${idx + 1}`}
                      />
                      <Checkbox 
                        checked={newQuestion.correctAnswer === option && option !== ""}
                        disabled={option === ""}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewQuestion({...newQuestion, correctAnswer: option});
                          }
                        }}
                      />
                    </div>
                  ))}
                  <p className="text-xs text-slate-500">Check the box next to the correct answer</p>
                </div>
              )}
              
              {newQuestion.type === "true-false" && (
                <div className="space-y-2">
                  <Label>Correct Answer</Label>
                  <RadioGroup 
                    value={newQuestion.correctAnswer}
                    onValueChange={(value) => setNewQuestion({...newQuestion, correctAnswer: value})}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="true" />
                      <Label htmlFor="true">True</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="false" />
                      <Label htmlFor="false">False</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
              
              {newQuestion.type === "short-answer" && (
                <div className="space-y-2">
                  <Label htmlFor="correctAnswer">Correct Answer</Label>
                  <Input 
                    id="correctAnswer" 
                    value={newQuestion.correctAnswer} 
                    onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: e.target.value})}
                    placeholder="Enter the correct answer"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="marks">Marks</Label>
                <Input 
                  id="marks" 
                  type="number" 
                  min="1" 
                  value={newQuestion.marks} 
                  onChange={(e) => setNewQuestion({...newQuestion, marks: parseInt(e.target.value) || 1})}
                />
              </div>
              
              <Button 
                type="button" 
                onClick={addQuestion}
                className="w-full"
              >
                Add Question
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Questions Added ({newExam.questions.length})</CardTitle>
          <CardDescription>
            Total marks: {newExam.questions.reduce((total, q) => total + q.marks, 0)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {newExam.questions.length > 0 ? (
            <ul className="space-y-6 divide-y">
              {newExam.questions.map((q, idx) => (
                <li key={idx} className="pt-4 first:pt-0">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium">Q{idx + 1}</span>
                        <span className="text-sm text-slate-500">{q.type} · {q.marks} marks</span>
                      </div>
                      <p className="font-medium">{q.question}</p>
                      
                      {q.type === "multiple-choice" && (
                        <ul className="ml-5 list-disc space-y-1 text-sm">
                          {q.options.map((opt, i) => (
                            <li key={i} className={opt === q.correctAnswer ? "text-green-600 font-medium" : ""}>
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
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const updatedQuestions = newExam.questions.filter((_, i) => i !== idx);
                        setNewExam({...newExam, questions: updatedQuestions});
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-slate-500 py-8">No questions added yet</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={createExam}
            disabled={newExam.questions.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Create Exam
          </Button>
        </CardFooter>
      </Card>
    </div>
  ); 

  // Take exam component
  const TakeExam = () => {
    if (!currentExam) return null;
    
    const question = currentExam.questions[currentQuestionIndex];
    const userAnswer = examAnswers[question.id];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{currentExam.title}</h2>
            <p className="text-slate-600">{currentExam.subject} - Class {currentExam.class}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-mono mb-1">{formatTime(timeLeft)}</div>
            <p className="text-sm text-slate-500">Time remaining</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Question {currentQuestionIndex + 1} of {currentExam.questions.length}</span>
            <span className="text-sm text-slate-500">({question.marks} marks)</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPrevQuestion} 
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToNextQuestion} 
              disabled={currentQuestionIndex === currentExam.questions.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
        
        <Progress value={(currentQuestionIndex + 1) / currentExam.questions.length * 100} className="h-2" />
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-xl mb-6">{question.question}</p>
            
            {question.type === "multiple-choice" && (
              <RadioGroup 
                value={userAnswer} 
                onValueChange={answerQuestion} 
                className="space-y-3"
              >
                {question.options.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50">
                    <RadioGroupItem value={option} id={`option-${idx}`} />
                    <Label htmlFor={`option-${idx}`} className="flex-grow cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {question.type === "true-false" && (
              <RadioGroup 
                value={userAnswer} 
                onValueChange={answerQuestion}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="true" id="answer-true" />
                  <Label htmlFor="answer-true" className="flex-grow cursor-pointer">True</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="false" id="answer-false" />
                  <Label htmlFor="answer-false" className="flex-grow cursor-pointer">False</Label>
                </div>
              </RadioGroup>
            )}
            
            {question.type === "short-answer" && (
              <Textarea 
                placeholder="Write your answer here..."
                value={userAnswer || ""}
                onChange={(e) => answerQuestion(e.target.value)}
                className="min-h-[120px]"
              />
            )}
          </CardContent>
        </Card>
        
        <div className="flex gap-4 mt-6 justify-between">
          <Button variant="outline" onClick={() => {
            if (confirm("Are you sure you want to exit this exam? Your progress will be lost.")) {
              setExamStarted(false);
              setActiveView("dashboard");
            }
          }}>
            Exit Exam
          </Button>
          
          <div className="space-x-4">
            {currentQuestionIndex < currentExam.questions.length - 1 ? (
              <Button onClick={goToNextQuestion}>Save & Continue</Button>
            ) : (
              <Button 
                onClick={() => {
                  if (confirm("Are you sure you want to submit? You won't be able to change your answers after submission.")) {
                    handleSubmitExam();
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Submit Exam
              </Button>
            )}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex flex-wrap gap-2">
            {currentExam.questions.map((_, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm" 
                className={`w-10 h-10 ${
                  idx === currentQuestionIndex ? 
                    'border-primary bg-primary/10' : 
                    examAnswers[currentExam.questions[idx].id] ? 
                      'bg-emerald-50 border-emerald-200' : 
                      ''
                }`}
                onClick={() => setCurrentQuestionIndex(idx)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
          <div className="flex items-center text-xs text-slate-500 mt-3 gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-200"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary/10 border border-primary"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-white border"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Results component
  const Results = () => {
    if (!currentExam) return null;
    
    const score = currentExam.score || 0;
    const percentage = Math.round((score / currentExam.totalMarks) * 100);
    
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{currentExam.title} - Results</h2>
            <p className="text-slate-600">{currentExam.subject} - Class {currentExam.class}</p>
          </div>
          <Button variant="outline" onClick={() => setActiveView("dashboard")}>
            Back to Dashboard
          </Button>
        </div>
        
        <Card className="overflow-hidden">
          <div className={`h-2 ${
            percentage >= 80 ? "bg-green-500" : 
            percentage >= 60 ? "bg-yellow-500" : 
            "bg-red-500"
          }`}></div>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold">
                {score} / {currentExam.totalMarks}
              </h3>
              <p className={`text-lg ${
                percentage >= 80 ? "text-green-600" : 
                percentage >= 60 ? "text-yellow-600" : 
                "text-red-600"
              }`}>
                {percentage}% - {
                  percentage >= 80 ? "Excellent!" : 
                  percentage >= 60 ? "Good effort!" : 
                  "Needs improvement"
                }
              </p>
            </div>
            
            <div className="space-y-6">
              {currentExam.questions.map((question, idx) => {
                const userAnswer = currentExam.userAnswers?.[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium">Q{idx + 1}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {isCorrect ? "Correct" : "Incorrect"} ({question.marks} marks)
                        </span>
                      </div>
                    </div>
                    
                    <p className="font-medium mt-2">{question.question}</p>
                    
                    {question.type === "multiple-choice" && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium">Options:</p>
                        <ul className="ml-5 list-disc space-y-1 text-sm">
                          {question.options.map((opt, i) => (
                            <li key={i} className={`${
                              opt === question.correctAnswer ? "text-green-600 font-medium" : 
                              opt === userAnswer && opt !== question.correctAnswer ? "text-red-600 line-through" : ""
                            }`}>
                              {opt} {opt === question.correctAnswer && "(Correct)"}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm">Your answer: <span className={isCorrect ? "text-green-600" : "text-red-600"}>{userAnswer || "No answer"}</span></p>
                      </div>
                    )}
                    
                    {question.type === "true-false" && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm">Correct answer: <span className="text-green-600">{question.correctAnswer}</span></p>
                        <p className="text-sm">Your answer: <span className={isCorrect ? "text-green-600" : "text-red-600"}>{userAnswer || "No answer"}</span></p>
                      </div>
                    )}
                    
                    {question.type === "short-answer" && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm">Correct answer: <span className="text-green-600">{question.correctAnswer}</span></p>
                        <p className="text-sm">Your answer: <span className={isCorrect ? "text-green-600" : "text-red-600"}>{userAnswer || "No answer"}</span></p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white font-bold rounded-lg p-2 text-xl">GL</div>
            <h1 className="text-xl font-bold">GradeLeap Exam Hub</h1>
          </div>
          <div className="flex items-center gap-4">
            <Tabs 
              value={userRole} 
              onValueChange={setUserRole}  
              className="w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student Mode</TabsTrigger>
                <TabsTrigger value="teacher">Teacher Mode</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "create-exam" && <CreateExam />}
        {activeView === "take-exam" && <TakeExam />}
        {activeView === "results" && <Results />}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span className="bg-emerald-600 text-white rounded p-1 text-sm">GL</span>
                GradeLeap Exam Hub
              </h2>
              <p className="text-sm text-slate-400">Making education assessment simpler</p>
            </div>
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} GradeLeap. All rights reserved.
            </div>
          </div>
        </div>
      </footer> 
    </div>
  );
}

export default Index;