const db = require("../library/database");

const getAllCategory = (req, res) => {
  const sql = "SELECT * FROM tbl_categorys";
  db.query(sql, (err, rows) => {
    res.json({
      payload: rows,
      message: "Success Show All Category!",
    });
  });
};

const getSingleCategory = (req, res) => {
  const { id } = req.params; // Assuming the product ID is passed as a URL parameter
  const sql = `SELECT * FROM tbl_categorys WHERE id_category = '${id}'`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({
        message: "Error retrieving category",
      });
    } else {
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
    }
  });
};

const addNewCategory = (req, res) => {
  const { category_name, photo } = req.body;
  const sql = `INSERT INTO tbl_categorys (category_name, categorys, photo) VALUES ('${category_name}', '${categorys}', '${photo}')`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      res.json({
        payload: data,
        message: "Category added!",
      });
    }
  });
};

const updateCategory = (req, res) => {
  const { category_name, photo } = req.body;
  const sql = `UPDATE tbl_categorys SET category_name = '${category_name}', categorys = '${categorys}', photo = '${photo}' WHERE category_name = '${category_name}'`;
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
        message: "Can't Update Data",
      });
    }
  });
};

const deleteCategory = (req, res) => {
  const { id_category } = req.body;
  const sql = `DELETE FROM tbl_category WHERE id_category = '${id_category}'`;
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
      res.status(500).json({
        message: "Can't Delete Data",
      });
    }
  });
};

module.exports = {
  getAllCategory,
  getSingleCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
