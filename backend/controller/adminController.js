const db = require("../library/database");

// Get all users
const getAllUsers = (req, res) => {
  const sql = "SELECT id_user, username, role FROM tbl_users WHERE role = 'admin'";
  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        serverMessage: err,
      });
    }
    res.json({
      payload: rows,
      message: "Success GET data",
    });
  });
};

const getSingleUser = (req, res) => {
  const { id } = req.params; // Assuming the user ID is passed as a URL parameter
  const sql = `SELECT id_user, username, role FROM tbl_users WHERE id_user = '${id}' AND role = 'admin'`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({
        message: "Error retrieving User",
      });
    } else {
      if (rows.length > 0) {
        res.json({
          payload: rows[0],
          message: "Success Get Single User!",
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    }
  });
};

// Create new user
const createNewUser = (req, res) => {
  const { username, password, role } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({
      message: "Forbidden. Only admin can be created.",
    });
  }

  const sql = `INSERT INTO tbl_users (username, password, role) VALUES (?, ?, ?)`;
  db.query(sql, [username, password, role], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        serverMessage: err,
      });
    }
    res.json({
      payload: { id_user: result.insertId, isSuccess: result.affectedRows },
      message: "Success Added Data",
    });
  });
};

// Update user
const updateUser = (req, res) => {
  const { id_user, username, password, role } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({
      message: "Forbidden. Only admin can be updated.",
    });
  }

  const sql = `UPDATE tbl_users SET username = ?, password = ?, role = ? WHERE id_user = ?`;
  db.query(sql, [username, password, role, id_user], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        serverMessage: err,
      });
    }
    if (result.affectedRows) {
      res.json({
        payload: { isSuccess: result.affectedRows },
        message: "Success Update Data",
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  });
};

// Delete user
const deleteUser = (req, res) => {
  const { id_user } = req.body;
  const sql = `DELETE FROM tbl_users WHERE id_user = ?`;
  db.query(sql, [id_user], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        serverMessage: err,
      });
    }
    if (result.affectedRows) {
      res.json({
        payload: { isSuccess: result.affectedRows },
        message: "Success Delete Data",
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
};
