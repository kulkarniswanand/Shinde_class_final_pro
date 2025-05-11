const pool = require("../../config/dbConfig");

// Get all staff
const getAllStaff = async () => {
    const [rows] = await pool.query("SELECT *, DATE_FORMAT(join_date, '%Y-%m-%d') as join_date FROM staff");
    return rows;
};

// Get staff by ID
const getStaffById = async (id) => {
    const [rows] = await pool.query("SELECT *, DATE_FORMAT(join_date, '%Y-%m-%d') as join_date FROM staff WHERE id = ?", [id]);
    return rows[0];
}; 

// Create new staff
const createStaff = async (staff) => {
    const { id, name, contact, designation, join_date, email, address, branch } = staff;

    try {
        const [result] = await pool.query(
            "INSERT INTO staff (id, name, contact, designation, join_date, email, address, branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [id, name, contact, designation, join_date, email, address, branch]
        );
        return result.insertId;
    } catch (error) {
        console.error("Database error while adding staff:", error);
        throw error;
    }
};

// Update staff details
const updateStaff = async (id, staff) => {
    const { name, address, contact, designation, join_date, email, branch } = staff;
    const formattedJoinDate = new Date(join_date).toISOString().split('T')[0];
    const [result] = await pool.query(
        "UPDATE staff SET name=?, address=?, contact=?, designation=?, join_date=?, email=?, branch=? WHERE id=?",
        [name, address, contact, designation, formattedJoinDate, email, branch, id]
    );
    return result.affectedRows; 
};

// Delete staff 
const deleteStaff = async (id) => {
    const [result] = await pool.query("DELETE FROM staff WHERE id=?", [id]);
    return result.affectedRows;
};

// Get staff by branch
const getStaffByBranch = async (branch) => {
    const [rows] = await pool.query("SELECT * FROM staff WHERE branch = ?", [branch]);
    return rows;
};

module.exports = { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff, getStaffByBranch };
