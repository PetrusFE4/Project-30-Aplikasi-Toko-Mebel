const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../library/database');
const secret = process.env.JWT_SECRET || 'your_secret_key';

const login = (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const sql = "SELECT * FROM tbl_users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      if (result.length > 0) {
        const user = result[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (isPasswordValid) {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            secret,
            { expiresIn: '1h' }
          );
          res.status(200).json({ token });
        } else {
          res.status(401).send('Email or password is incorrect');
        }
      } else {
        res.status(401).send('Email or password is incorrect');
      }
    });
  } else {
    res.status(400).send('Bad Request');
  }
};


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

const getSingleUser = (req, res) => {
  const { id } = req.params; 
  const sql = `SELECT * FROM tbl_users WHERE id_user = '${id}'`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({
        message: "Error retrieving user",
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

const createNewUser = (req, res) => {
  const { username, email, password, photo } = req.body;

  // Generate salt
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const sql = `INSERT INTO tbl_users (username, email, password, photo) 
               VALUES ('${username}', '${email}', '${hashedPassword}', '${photo}')`;

  db.query(sql, (err, fields) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: err
      });
    }
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      res.json({
        payload: data,
        message: 'Success Added Data',
      });
    } else {
      res.status(500).json({
        message: 'Failed to add user',
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
  login,
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
};
