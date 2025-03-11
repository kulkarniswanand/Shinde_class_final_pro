import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "tailwindcss/tailwind.css";

const FeesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [discount, setDiscount] = useState({ type: "amount", value: 0 });
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({ class: "", year: "", gender: "" });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/feesManagement`);
        const data = await response.json();
        const formattedData = data.map((student) => ({
          ...student,
          amountGiven: student.amountGiven || 0,
          registrationId: student.studentId?.toString() || "",
          name: student.studentname || "N/A",
          class: student.class || "N/A",
          year: student.year?.toString() || "N/A",
          gender: student.gender || "N/A",
          totalFees: student.totalFees || 0,
          dueDate: student.dueDate || "N/A",
        }));
        setStudents(formattedData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleStatusClick = (record) => {
    setSelectedStudent(record);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePrintReceipt = (record) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Shinde Classes - Fees Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            h2 { color: #6B46C1; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
            th { background: #6B46C1; color: white; }
          </style>
        </head>
        <body>
          <h2>Shinde Classes - Fees Receipt</h2>
          <table>
            <tr><th>Registration ID</th><td>${record.registrationId}</td></tr>
            <tr><th>Name</th><td>${record.name}</td></tr>
            <tr><th>Class</th><td>${record.class}</td></tr>
            <tr><th>Year</th><td>${record.year}</td></tr>
            <tr><th>Gender</th><td>${record.gender}</td></tr>
            <tr><th>Total Fees</th><td>${record.totalFees}</td></tr>
            <tr><th>Amount Given</th><td>${record.amountGiven}</td></tr>
            <tr><th>Remaining Amount</th><td>${record.totalFees - record.amountGiven}</td></tr>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(filters.name?.toLowerCase() || "") &&
    student.class.toLowerCase().includes(filters.class.toLowerCase()) &&
    student.year.toLowerCase().includes(filters.year.toLowerCase()) &&
    student.gender.toLowerCase().includes(filters.gender.toLowerCase())
  );

  const columns = [
    { title: "Registration ID", dataIndex: "registrationId", key: "registrationId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Total Fees", dataIndex: "totalFees", key: "totalFees" },
    { title: "Amount Given", dataIndex: "amountGiven", key: "amountGiven" },
    { title: "Remaining Amount", key: "remainingAmount", render: (_, record) => record.totalFees - record.amountGiven },
    { title: "Fee Status", key: "status", render: (_, record) => <Button onClick={() => handleStatusClick(record)} className="bg-purple-600 hover:bg-purple-700 text-white">Check Status</Button> },
    { title: "Print", key: "print", render: (_, record) => <Button onClick={() => handlePrintReceipt(record)} className="bg-orange-500 hover:bg-orange-600 text-white">Print Receipt</Button> },
  ];

  return (
    <div className="p-5 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-semibold text-purple-400">Fees Management</h2>
      
      <div className="grid grid-cols-4 gap-4 my-4">
        <Input name="name" placeholder="Filter by Name" className="bg-gray-800 text-white placeholder-gray-400 p-2 rounded-md" onChange={handleFilterChange} />
        <Input name="class" placeholder="Filter by Class" className="bg-gray-800 text-white placeholder-gray-400 p-2 rounded-md" onChange={handleFilterChange} />
        <Input name="year" placeholder="Filter by Year" className="bg-gray-800 text-white placeholder-gray-400 p-2 rounded-md" onChange={handleFilterChange} />
        <Input name="gender" placeholder="Filter by Gender" className="bg-gray-800 text-white placeholder-gray-400 p-2 rounded-md" onChange={handleFilterChange} />
      </div>
      
      <Table dataSource={filteredStudents} columns={columns} rowKey="id" className="bg-gray-900 text-white" />
    </div>
  );
}

export default FeesManagement;
