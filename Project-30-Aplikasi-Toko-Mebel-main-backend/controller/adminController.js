const db = require("../library/database");

// Get all admins
const getAllAdmin = (req, res) => {
  const sql = "SELECT * FROM tbl_admins";
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

const getSingleAdmin = (req, res) => {
  const { id } = req.params; // Assuming the product ID is passed as a URL parameter
  const sql = `SELECT * FROM tbl_admins WHERE id_admin = '${id}'`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({
        message: "Error retrieving Admin",
      });
    } else {
      if (rows.length > 0) {
        res.json({
          payload: rows[0],
          message: "Success Get Single Admin!",
        });
      } else {
        res.status(404).json({
          message: "Admin not found",
        });
      }
    }
  });
};

// Create new admin
const createNewAdmin = (req, res) => {
  const { name, email, password, role, photo } = req.body;

  const sql = `INSERT INTO tbl_admins (name, email, password, role, photo) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [name, email, password, role, photo], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        serverMessage: err,
      });
    }
    res.json({
      payload: { id: result.insertId, isSuccess: result.affectedRows },
      message: "Success Added Data",
    });
  });
};

// Update admin
const updateAdmin = (req, res) => {
  const { name, email, password, role, photo } = req.body;

  const sql = `UPDATE tbl_admins SET name = ?, password = ?, role = ?, photo = ? WHERE email = ?`;
  db.query(sql, [name, password, role, photo, email], (err, result) => {
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
        message: "Admin Not Found",
      });
    }
  });
};

// Delete admin
const deleteAdmin = (req, res) => {
  const { email } = req.body;
  const sql = `DELETE FROM tbl_admins WHERE email = ?`;
  db.query(sql, [email], (err, result) => {
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
        message: "Admin Not Found",
      });
    }
  });
};

module.exports = {
  getAllAdmin,
  getSingleAdmin,
  createNewAdmin,
  updateAdmin,
  deleteAdmin,
};
