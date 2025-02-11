const db = require('../db');  // Make sure dbConfig.js uses `db.promise()` as shown above

// Create a new branch
exports.createBranch = async (req, res) => {
  const { name, location, username, password } = req.body;

  // Input validation
  if (!name || !location || !username || password.length < 6) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    // Save branch to the database
    const query = `
      INSERT INTO branches (name, location, username, password) 
      VALUES (?, ?, ?, ?)
    `;

    // Use db.promise().execute()
    const [result] = await db.execute(query, [name, location, username, password]);

    // Send a successful response
    res.status(201).json({
      message: 'Branch created successfully',
      branchId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating branch:', error);

    // Enhanced error handling
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({ message: 'Table does not exist. Check your database setup.' });
    } else if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Duplicate entry. A branch with this username already exists.' });
    }

    // Log the error stack for debugging
    console.error('Error stack:', error.stack);

    // Default error response
    res.status(500).json({ message: 'Internal server error' });
  }
};
