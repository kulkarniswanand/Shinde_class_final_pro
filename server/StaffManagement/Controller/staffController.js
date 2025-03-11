const Staff = require("../Model/staffModel");

// Get all staff
exports.getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.getAllStaff();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving staff details", error });
    }
};
 
// Get staff by ID
exports.getStaffById = async (req, res) => {
    try { 
        const staff = await Staff.getStaffById(req.params.id);
        if (!staff) return res.status(404).json({ message: "Staff not found" });
        res.status(200).json(staff);
    } catch (error) { 
        res.status(500).json({ message: "Error retrieving staff details", error });
    }
};

// Create new staff
exports.createStaff = async (req, res) => {
    try {
        const { id: staffId, name, address, contact, designation, join_date, email, branch } = req.body;

        // Validate branch
        const validBranches = ["Pune", "Chinchani", "Palus"];
        if (!validBranches.includes(branch)) {
            return res.status(400).json({ message: "Invalid branch. Allowed branches: Pune, Chinchani, Palus" });
        }

        // Format join_date to YYYY-MM-DD
        const formattedJoinDate = new Date(join_date).toISOString().split('T')[0];

        const id = await Staff.createStaff({ id: staffId, name, address, contact, designation, join_date: formattedJoinDate, email, branch });
        res.status(201).json({ message: "Staff added successfully", id });
    } catch (error) {
        res.status(500).json({ message: "Error adding staff", error });
    }
};

// Update staff details
exports.updateStaff = async (req, res) => {
    try {
        const { id, name, address, contact, designation, join_date, email, branch } = req.body;

        // Validate branch
        const validBranches = ["Pune", "Chinchani", "Palus"];
        if (!validBranches.includes(branch)) {
            return res.status(400).json({ message: "Invalid branch. Allowed branches: Pune, Chinchani, Palus" });
        }

        // Format join_date to YYYY-MM-DD
        const formattedJoinDate = new Date(join_date).toISOString().split('T')[0];

        const updated = await Staff.updateStaff(req.params.id, { id, name, address, contact, designation, join_date: formattedJoinDate, email, branch });
        if (!updated) return res.status(404).json({ message: "Staff not found or no changes made" });

        res.status(200).json({ message: "Staff updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating staff", error });
    }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
    try {
        const deleted = await Staff.deleteStaff(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Staff not found" });

        res.status(200).json({ message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting staff", error });
    }
};

// Get staff by branch
exports.getStaffByBranch = async (req, res) => {
    try {
        const staff = await Staff.getStaffByBranch(req.params.branch);
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving staff details", error });
    }
};
