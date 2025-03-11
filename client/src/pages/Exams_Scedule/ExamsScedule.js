import { useState, useEffect } from "react";

export default function ExamSchedule() {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: "Mathematics Midterm",
      date: "2025-03-10",
      class: "10th Grade",
      subject: "Mathematics",
      totalMarks: "100",
      time: "10:00 AM - 12:00 PM",
      branch: "Science"
    }
  ]);
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [examData, setExamData] = useState({
    name: "",
    date: "",
    class: "",
    subject: "",
    totalMarks: "",
    time: "",
    branch: "",
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    const response = await fetch("/api/branches");
    const data = await response.json();
    setBranches(data);
  };

  const handleChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setExams([...exams, { id: exams.length + 1, ...examData }]);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg transition" onClick={() => setShowModal(true)}>Create Exam Schedule</button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-white">Create Exam</h2>
            <input className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-2 text-white" name="name" placeholder="Exam Name" onChange={handleChange} />
            <input className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-2 text-white" name="date" type="date" onChange={handleChange} />
            <input className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-2 text-white" name="class" placeholder="Class" onChange={handleChange} />
            <input className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-2 text-white" name="subject" placeholder="Subject" onChange={handleChange} />
            <input className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-2 text-white" name="totalMarks" placeholder="Total Marks" onChange={handleChange} />
            <input className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-2 text-white" name="time" placeholder="Time" onChange={handleChange} />
            <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-2 text-white" name="branch" onChange={handleChange}>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.name}>{branch.name}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition" onClick={handleSubmit}>Create</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg text-white">
            <h3 className="text-xl font-semibold">{exam.name}</h3>
            <p className="text-gray-400">{exam.date} | {exam.class} | {exam.subject}</p>
            <p className="text-gray-400">{exam.totalMarks} Marks | {exam.time} | {exam.branch}</p>
            <div className="mt-3 flex gap-3">
              <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded transition">Show Details</button>
              <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded transition">Edit</button>
              <button className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
