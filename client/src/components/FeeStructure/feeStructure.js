import React, { useState, useEffect } from "react";
import axios from "axios";

const FeesStructure = () => {
  const [feesData, setFeesData] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(null);

  useEffect(() => {
    fetchFeesData(); 
    fetchBranches();
  }, []);

  const fetchFeesData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/feesStructure`);
      setFeesData(response.data);
    } catch (error) {
      console.error("Error fetching fees data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/updatebranch`);
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this fee structure?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/feesStructure/${id}`);
        fetchFeesData();
      } catch (error) {
        console.error("Error deleting fee structure:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-violet-400 mb-6">Fees Structure</h1>
      <button 
        onClick={() => setShowAddForm(true)}
        className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg mb-4">
        Add New Fees Structure
      </button>

      {loading ? (
        <p className="text-center text-gray-300">Loading fees data...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-violet-300">
              <th className="p-3">ID</th>
              <th className="p-3">Class</th>
              <th className="p-3">Year</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Total Fees</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee) => (
              <tr key={fee.id} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="p-3">{fee.id}</td>
                <td className="p-3">{fee.class}</td>
                <td className="p-3">{fee.year}</td>
                <td className="p-3">{fee.gender}</td>
                <td className="p-3">{fee.branch}</td>
                <td className="p-3">{fee.totalAmount}</td>
                <td className="p-3 flex gap-2">
                  <button 
                    onClick={() => setShowUpdateForm(fee.id)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(fee.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddForm && <AddFeesForm onClose={() => setShowAddForm(false)} fetchFees={fetchFeesData} branches={branches} />}
      {showUpdateForm && <UpdateFeesForm id={showUpdateForm} onClose={() => setShowUpdateForm(null)} fetchFees={fetchFeesData} branches={branches} />}
    </div>
  );
};

const AddFeesForm = ({ onClose, fetchFees, branches }) => {
  const [formData, setFormData] = useState({ class: "", year: "", gender: "", branch: "", totalAmount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.totalAmount <= 0) {
      alert("Total Fees must be a positive amount.");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/feesStructure`, formData);
      fetchFees();
      onClose();
    } catch (error) {
      console.error("Error adding fees structure:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4">Add New Fees Structure</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Class" className="w-full p-2 bg-gray-800 text-white rounded" required 
            onChange={(e) => setFormData({ ...formData, class: e.target.value })} />
          <input type="text" placeholder="Year" className="w-full p-2 bg-gray-800 text-white rounded" required 
            onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
          <select className="w-full p-2 bg-gray-800 text-white rounded" required 
            onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select className="w-full p-2 bg-gray-800 text-white rounded" required 
            onChange={(e) => setFormData({...formData, branch: e.target.value})}>
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.name}>{branch.name}</option>
            ))}
          </select>
          <input type="number" placeholder="Total Fees" className="w-full p-2 bg-gray-800 text-white rounded" required 
            onChange={(e) => setFormData({...formData, totalAmount: e.target.value})} />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-gray-700 px-3 py-1 rounded">Cancel</button>
            <button type="submit" className="bg-violet-600 hover:bg-violet-700 px-3 py-1 rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateFeesForm = ({ id, onClose, fetchFees }) => {
    const [formData, setFormData] = useState({ class: "", year: "", gender: "", branch: "", totalAmount: "" });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/fees-structure/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching fee structure details:", error);
        }
      };
      fetchData();
    }, [id]);
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`/api/fees-structure/${id}`, formData);
        fetchFees();
        onClose();
      } catch (error) {
        console.error("Error updating fees structure:", error);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-xl font-semibold mb-4">Update Fees Structure</h2>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input type="text" placeholder="Class" className="w-full p-2 bg-gray-800 text-white rounded"
              value={formData.class} onChange={(e) => setFormData({ ...formData, class: e.target.value })} required />
            <input type="text" placeholder="Year" className="w-full p-2 bg-gray-800 text-white rounded"
              value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} required />
            <input type="text" placeholder="Gender" className="w-full p-2 bg-gray-800 text-white rounded"
              value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} required />
            <input type="text" placeholder="Branch" className="w-full p-2 bg-gray-800 text-white rounded"
              value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} required />
            <input type="number" placeholder="Total Amount" className="w-full p-2 bg-gray-800 text-white rounded"
              value={formData.totalAmount} onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })} required />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="bg-gray-700 px-3 py-1 rounded">Cancel</button>
              <button type="submit" className="bg-violet-600 hover:bg-violet-700 px-3 py-1 rounded">Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default FeesStructure;
 