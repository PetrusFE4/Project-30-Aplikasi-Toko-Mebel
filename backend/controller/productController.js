const db = require("../library/database");

const getAllProduct = async (req, res) => {
  try {
    const sql = "SELECT * FROM tbl_products";
    const [rows, fields] = await db.query(sql);
    res.json({
      payload: rows,
      message: "Success Show All Product!",
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: err,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  const { category_name } = req.params;
  try {
    const sql = `
      SELECT p.*, c.id_category 
      FROM tbl_products p 
      JOIN tbl_categorys c ON p.id_category = c.id_category
      WHERE c.category_name = ?`;
    const [rows, fields] = await db.query(sql, [category_name]);
    res.json({
      payload: rows,
      message: `Products in category '${category_name}'`,
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: err,
    });
  }
};

const getSingleProduct = async (req, res) => {
  const { id_product } = req.params;
  try {
    const sql = `SELECT * FROM tbl_products WHERE id_product = ?`;
    const [rows, fields] = await db.query(sql, [id_product]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: `Product with ID ${id_product} not found`,
      });
    }
    res.json({
      payload: rows[0],
      message: `Product details for ID ${id_product}`,
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: err,
    });
  }
};

const addNewProduct = async (req, res) => {
  const { product_name, description, price, stock, photos, id_category } = req.body;
  try {
    const sql = `INSERT INTO tbl_products (product_name, description, price, stock, photos, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await db.query(sql, [product_name, description, price, stock, photos, id_category]);
    res.json({
      payload: {
        isSuccess: result.affectedRows,
        id: result.insertId,
      },
      message: "Product added!",
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: err,
    });
  }
};

const updateProduct = async (req, res) => {
  const { product_name, description, price, stock, photos, id_category } = req.body;
  try {
    const sql = `UPDATE tbl_products SET description = ?, price = ?, stock = ?, photos = ?, category_id = ? WHERE product_name = ?`;
    const result = await db.query(sql, [description, price, stock, photos, id_category, product_name]);
    res.json({
      payload: {
        isSuccess: result.affectedRows,
        message: result.message,
      },
      message: "Success Update Data",
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: err,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id_product } = req.body;
  try {
    const sql = `DELETE FROM tbl_products WHERE id_product = ?`;
    const result = await db.query(sql, [id_product]);
    res.json({
      payload: {
        isSuccess: result.affectedRows,
        message: result.message,
      },
      message: "Success Delete Data",
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: err,
    });
  }
};

module.exports = {
  getAllProduct,
  getProductsByCategory,
  getSingleProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
