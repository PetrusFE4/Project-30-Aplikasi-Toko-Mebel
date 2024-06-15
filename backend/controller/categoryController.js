const db = require("../library/database");

const getAllCategory = async (req, res) => {
  try {
    const sql = "SELECT * FROM tbl_categorys";
    const rows = await db.query(sql);
    res.json({
      payload: rows,
      message: "Success Show All Category!",
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: err,
    });
  }
};

const getSingleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `SELECT * FROM tbl_categorys WHERE id_category = ?`;
    const rows = await db.query(sql, [id]);
    if (rows.length > 0) {
      res.json({
        payload: rows[0],
        message: "Success Get Single Category!",
      });
    } else {
      res.status(404).json({
        message: "Category not found",
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

const addNewCategory = async (req, res) => {
  const { category_name, photo } = req.body;
  try {
    const sql = `INSERT INTO tbl_categorys (category_name, photo) VALUES (?, ?)`;
    const result = await db.query(sql, [category_name, photo]);
    res.json({
      payload: {
        isSuccess: result.affectedRows,
        id: result.insertId,
      },
      message: "Category added!",
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: err,
    });
  }
};

const updateCategory = async (req, res) => {
  const { category_name, photo } = req.body;
  try {
    const sql = `UPDATE tbl_categorys SET category_name = ?, photo = ? WHERE category_name = ?`;
    const result = await db.query(sql, [category_name, photo, category_name]);
    if (result.affectedRows > 0) {
      res.json({
        payload: {
          isSuccess: result.affectedRows,
          message: result.message,
        },
        message: "Success Update Data",
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

const deleteCategory = async (req, res) => {
  const { id_category } = req.body;
  try {
    const sql = `DELETE FROM tbl_categorys WHERE id_category = ?`;
    const result = await db.query(sql, [id_category]);
    if (result.affectedRows > 0) {
      res.json({
        payload: {
          isSuccess: result.affectedRows,
          message: result.message,
        },
        message: "Success Delete Data",
      });
    } else {
      res.status(500).json({
        message: "Can't Delete Data",
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
  getAllCategory,
  getSingleCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
