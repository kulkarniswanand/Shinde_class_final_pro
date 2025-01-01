const { findUserByCredentials } = require('../models/user');

async function login(req, res) {
  const { role, username, password } = req.body;

  try {
    const users = await findUserByCredentials(role, username, password);

    if (users.length > 0) {
      return res.json({ role: users[0].role, message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { login };
