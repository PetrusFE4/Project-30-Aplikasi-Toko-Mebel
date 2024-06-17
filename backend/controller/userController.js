const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const db = require('../library/database');

const secretKey = process.env.JWT_SECRET; // Pastikan ini benar

const generateToken = (user) => {
  const token = jwt.sign({ id_user: user.id_user, name: user.name }, secretKey, { expiresIn: '1h' });
  return token;
};

// Function to generate JWT token
const login = async (req, res) => {
  const { name, password } = req.body;
  console.log(`Login attempt with name: ${name}`);

  try {
      const sql = `SELECT id_user, name, password FROM tbl_users WHERE LOWER(name) = LOWER(?)`;
      const [rows, fields] = await db.query(sql, [name]);

      if (rows.length === 0) {
          console.log(`User '${name}' not found`);
          return res.status(401).json({
              message: "Invalid name or password",
          });
      }

      const user = rows[0];
      const result = await bcrypt.compare(password, user.password);

      if (!result) {
          console.log(`Password does not match for user '${name}'`);
          return res.status(401).json({
              message: "Invalid name or password",
          });
      }

      const token = generateToken(user);
      let redirectUrl = '/home'; // Default redirect URL for users
      if (user.role === 'super_admin') {
          redirectUrl = '/super_admin'; // Redirect super_admin to different route
      } else if (user.role === 'admin') {
          redirectUrl = '/admin'; // Redirect admin to different route
      }
      res.json({
          token: token,
          redirectUrl: redirectUrl,
          message: "Login successful",
      });
  } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({
          message: "Internal Server Error",
          serverMessage: err,
      });
  }
};

// Function for register
const register = async (req, res) => {
  const { name, email, password, photo } = req.body;
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `INSERT INTO tbl_users (name, email, password, role, photo) VALUES (?, ?, ?, 'user', ?)`;
      const result = await db.query(sql, [name, email, hashedPassword, photo]);
      res.json({
          message: "Registration successful",
      });
  } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({
          message: "Internal Server Error",
          serverMessage: err,
      });
  }
};


// Function to get all users
const getAllUsers = async (req, res) => {
    const sql = "SELECT * FROM tbl_users";
    try {
        const [rows, fields] = await db.query(sql);
        res.json({
            payload: rows,
            message: "Success GET data",
        });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

// Function to get a single user by ID
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM tbl_users WHERE id_user = ?`;
    try {
        const [rows, fields] = await db.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json({
            payload: rows[0],
            message: "Success Get Single User!",
        });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

// Function to create a new user
const createNewUser = async (req, res) => {
    const { name, email, password, photo } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO tbl_users (name, email, password, photo) VALUES (?, ?, ?, ?)`;
        const result = await db.query(sql, [name, email, hashedPassword, photo]);
        const data = {
            isSuccess: result.affectedRows === 1,
            id: result.insertId,
        };
        res.json({
            payload: data,
            message: 'Success Added Data',
        });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

// Function to update a user
const updateUser = async (req, res) => {
    const { id, name, email, password, photo } = req.body;
    const sql = `UPDATE tbl_users SET name = ?, email = ?, password = ?, photo = ? WHERE id_user = ?`;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(sql, [name, email, hashedPassword, photo, id]);
        if (result.affectedRows === 1) {
            res.json({
                payload: {
                    isSuccess: true,
                    message: "Success Update Data",
                },
            });
        } else {
            res.status(500).json({
                message: "Can't Update Data",
            });
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

// Function to delete a user
const deleteUser = async (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM tbl_users WHERE id_user = ?`;
    try {
        const result = await db.query(sql, [id]);
        if (result.affectedRows === 1) {
            res.json({
                payload: {
                    isSuccess: true,
                    message: "Success Delete Data",
                },
            });
        } else {
            res.status(404).json({
                message: "User Not Found",
            });
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

module.exports = {
    login,
    register,
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
};
