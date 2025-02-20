import React, { useState } from "react";
import { Table, Button, Modal, Input, Select } from "antd";
import "tailwindcss/tailwind.css";

const FeesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [discount, setDiscount] = useState({ type: "amount", value: 0 });
  const [filters, setFilters] = useState({});

  const students = [
    {
      id: 1,
      registrationId: "REG001",
      name: "John Doe",
      class: "10th",
      year: "2025",
      gender: "Male",
      totalFees: 50000,
      amountGiven: 0,
      dueDate: "2025-06-30",
    },
  ];

  const handleStatusClick = (record) => {
    setSelectedStudent(record);
    setIsModalOpen(true);
  };

  const handleDiscountChange = (type, value) => {
    setDiscount({ type, value: parseFloat(value) || 0 });
  };

  const calculateFinalFees = () => {
    let finalAmount = selectedStudent.totalFees;
    if (discount.type === "amount") {
      finalAmount -= discount.value;
    } else {
      finalAmount -= (finalAmount * discount.value) / 100;
    }
    return finalAmount - selectedStudent.amountGiven;
  };

  const columns = [
    { title: "Registration ID", dataIndex: "registrationId", key: "registrationId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Total Fees", dataIndex: "totalFees", key: "totalFees" },
    { title: "Amount Given", dataIndex: "amountGiven", key: "amountGiven" },
    { title: "Remaining Amount", key: "remainingAmount", render: (_, record) => record.totalFees - record.amountGiven },
    { title: "Due Date", dataIndex: "dueDate", key: "dueDate" },
    { title: "Fee Status", key: "status", render: (_, record) => <Button onClick={() => handleStatusClick(record)}>Check Status</Button> },
    { title: "Print", key: "print", render: () => <Button className="bg-violet-600 text-white">Print Fees Receipt</Button> },
  ];

  return (
    <div className="p-5 bg-black text-white min-h-screen">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-violet-400">Fees Management</h2>
        <Button className="bg-violet-600 text-white">Go to Dashboard</Button>
      </div>
      <div className="mb-4 flex space-x-2">
        <Select placeholder="Filter by Class" className="bg-gray-800 text-white" />
        <Select placeholder="Filter by Year" className="bg-gray-800 text-white" />
        <Select placeholder="Filter by Gender" className="bg-gray-800 text-white" />
        <Select placeholder="Filter by Remaining Fees" className="bg-gray-800 text-white" />
        <Select placeholder="Filter by Due Date" className="bg-gray-800 text-white" />
      </div>
      <Table
        dataSource={students}
        columns={columns}
        rowKey="id"
        rowClassName={(record) => (record.totalFees - record.amountGiven === 0 ? "bg-green-500" : "bg-red-500")}
      />
      <Modal title="Update Fee Details" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        {selectedStudent && (
          <div>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Total Fees:</strong> {selectedStudent.totalFees}</p>
            <div className="mb-3">
              <label>Amount Given:</label>
              <Input type="number" defaultValue={selectedStudent.amountGiven} />
            </div>
            <div className="mb-3">
              <label>Additional Discount:</label>
              <Select value={discount.type} onChange={(value) => handleDiscountChange(value, discount.value)}>
                <Select.Option value="amount">Amount</Select.Option>
                <Select.Option value="percentage">Percentage</Select.Option>
              </Select>
              <Input type="number" value={discount.value} onChange={(e) => handleDiscountChange(discount.type, e.target.value)} />
            </div>
            <p><strong>Final Fees After Discount:</strong> {calculateFinalFees()}</p>
            <Button type="primary" onClick={() => setIsModalOpen(false)}>Update</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FeesManagement;
