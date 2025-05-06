import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const FeesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amountGiven, setAmountGiven] = useState(0);
  const [discount, setDiscount] = useState(0); // Add state for discount
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({ class: "", year: "", gender: "" });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/students`);
        const data = await response.json();
        const formattedData = data.map((student) => ({
          ...student,
          amountGiven: student.amountGiven || 0,
          discount: student.discount || 0, // Include discount field
          registrationId: student.studentId?.toString() || "",
          name: student.studentname || "N/A",
          class: student.class || "N/A",
          year: student.year?.toString() || "N/A",
          gender: student.gender || "N/A",
          totalFees: student.totalFees || 0,
          dueDate: student.dueDate || "N/A",
          installments: student.installments || [], // Ensure installments are mapped
          remainingFees: student.remainingFees || student.totalFees - student.amountGiven,
        }));
        setStudents(formattedData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    console.log("Fetched students data:", students); // Debugging log
  }, [students]);

  const handleStatusClick = (record) => {
    setSelectedStudent(record);
    setAmountGiven(record.amountGiven);
    setDiscount(record.discount || 0); // Set discount value
    setIsModalOpen(true);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
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
        installments: student.installments || [], // Ensure installments are mapped
        remainingFees: student.remainingFees || student.totalFees - student.amountGiven,
      }));
      setStudents(formattedData);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
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
            <tr><th>Remaining Amount</th><td>${record.remainingFees || record.totalFees - record.amountGiven}</td></tr>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleUpdate = async () => {
    const paymentDate = new Date().toISOString().split("T")[0];
    const newInstallment = {
      amount: amountGiven,
      date: paymentDate,
    };

    const updatedInstallments = [...(selectedStudent.installments || []), newInstallment];
    const amountGivenSum = updatedInstallments.reduce((sum, inst) => sum + parseFloat(inst.amount), 0);
    const remainingFees = parseFloat(selectedStudent.totalFees) - discount - amountGivenSum;

    const updatedData = {
      studentId: selectedStudent.registrationId,
      totalFees: parseFloat(selectedStudent.totalFees),
      amountGiven: parseFloat(amountGiven),
      paymentDate: paymentDate,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/feesManagement/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setStudents(
          students.map((student) =>
            student.registrationId === selectedStudent.registrationId
              ? {
                  ...student,
                  installments: updatedInstallments,
                  remainingFees,
                }
              : student
          )
        );
        setIsModalOpen(false);
      } else {
        console.error("Failed to update fees. Response:", await response.json());
      }
    } catch (error) {
      console.error("Error updating fees:", error);
    }
  };

  const filteredStudents = students.filter(student => {
    console.log("Filtering student:", student); // Debugging log
    return (
      (student.name?.toLowerCase() || "").includes(filters.name?.toLowerCase() || "") &&
      (student.class?.toLowerCase() || "").includes(filters.class?.toLowerCase() || "") &&
      (student.year?.toString().toLowerCase() || "").includes(filters.year?.toLowerCase() || "") &&
      (student.gender?.toLowerCase() || "").includes(filters.gender?.toLowerCase() || "")
    );
  });

  const columns = [
    { title: "Registration ID", dataIndex: "registrationId", key: "registrationId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Total Fees", dataIndex: "totalFees", key: "totalFees" },
    { title: "Remaining Amount", dataIndex: "remainingFees", key: "remainingFees" },
    { title: "Discount", dataIndex: "discount", key: "discount" }, // Add discount column
    {
      title: "Installments",
      key: "installments",
      render: (_, record) =>
        record.installments?.map((inst, index) => (
          <div key={index}>
            <span>{`₹${inst.amount} on ${inst.date}`}</span>
          </div>
        )) || "No installments",
    },
    {
      title: "Fee Status",
      key: "status",
      render: (_, record) => (
        <Button onClick={() => handleStatusClick(record)} className="bg-purple-600 hover:bg-purple-700 text-white">
          Check Status
        </Button>
      ),
    },
    {
      title: "Print",
      key: "print",
      render: (_, record) => (
        <Button onClick={() => handlePrintReceipt(record)} className="bg-orange-500 hover:bg-orange-600 text-white">
          Print Receipt
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-purple-400">Fees Management</h2>
        <Link to="/admin-dashboard">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Go to Dashboard</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-4 my-4">
        <Input name="name" placeholder="Filter by Name" className="bg-white text-black placeholder-black p-2 rounded-md" onChange={handleFilterChange} />
        <Input name="class" placeholder="Filter by Class" className="bg-white text-black placeholder-black p-2 rounded-md" onChange={handleFilterChange} />
        <Input name="year" placeholder="Filter by Year" className="bg-white text-black placeholder-black p-2 rounded-md" onChange={handleFilterChange} />
        <Input name="gender" placeholder="Filter by Gender" className="bg-white text-black placeholder-black p-2 rounded-md" onChange={handleFilterChange} />
      </div>
      
      <Table dataSource={filteredStudents} columns={columns} rowKey="id" className="bg-gray-900 text-white" />
      
      <Modal
        title={<span className="text-white">Update Fee Details</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="bg-gray-900 text-white rounded-lg"
      >
        {selectedStudent && (
          <div className="p-6">
            <p className="mb-2 text-black">
              <strong>Name:</strong> {selectedStudent.name}
            </p>
            <p className="mb-2 text-black">
              <strong>Total Fees:</strong> {selectedStudent.totalFees}
            </p>
            <p className="mb-2 text-black">
              <strong>Remaining Fees:</strong> {selectedStudent.remainingFees}
            </p>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-black">Discount:</label>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} // Update discount value
                className="bg-white text-black rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-black">Amount Given:</label>
              <Input
                type="number"
                value={amountGiven}
                onChange={(e) => setAmountGiven(parseFloat(e.target.value) || 0)}
                className="bg-white text-black rounded-md p-2"
              />
            </div>
            <p className="mb-4 text-black">
              <strong>Installments:</strong>
            </p>
            {selectedStudent.installments?.map((inst, index) => (
              <p key={index} className="text-black">
                ₹{inst.amount} on {inst.date}
              </p>
            ))}
            <Button
              type="primary"
              onClick={handleUpdate}
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-4 py-2"
            >
              Update
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FeesManagement;