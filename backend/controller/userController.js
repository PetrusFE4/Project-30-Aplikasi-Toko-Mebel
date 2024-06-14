const db = require("../library/database");

const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM tbl_users";
  db.query(sql, (err, rows) => {
    try {
      // hasil dari mysql
      res.json({
        payload: rows,
        message: "Success GET data",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        serverMessage: error,
      });
    }
  });
};

const createNewUser = (req, res) => {
  const { username, email, password, photo } = req.body;

  const sql = `INSERT INTO tbl_users (username, email, password, photo) VALUES ('${username}', '${email}', '${password}', '${photo}')`;

  db.query(sql, (err, fields) => {
    if (err) throw err;
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      res.json({
        payload: data,
        message: "Success Added Data",
      });
    }
  });
};

const updateUser = (req, res) => {
  const { username, email, password, photo } = req.body;

  const sql = `UPDATE tbl_users SET username = '${username}', email = '${email}', password = '${password}', photo = '${photo}' WHERE email = '${email}'`;

  db.query(sql, (err, fields) => {
    if (err) throw err;
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      res.json({
        payload: data,
        message: "Success Update Data",
      });
    } else {
      res.status(500).json({
        message: "Cant Update Data",
      });
    }
  });
};

const deleteUser = (req, res) => {
  const { email } = req.body;
  const sql = `DELETE FROM tbl_users WHERE email = '${email}'`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      res.json({
        payload: data,
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
  createNewUser,
  updateUser,
  deleteUser,
};
