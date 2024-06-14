const db = require("../library/database");

const getAllProduct = (req, res) => {
  const sql = "SELECT * FROM tbl_products";
  db.query(sql, (err, rows) => {
    res.json({
      payload: rows,
      message: "Success Show All Product !",
    });
  });
};

const addNewProduct = (req, res) => {
  const { product_name, description, price, stock, photos } = req.body;
  const sql = `INSERT INTO tbl_products (product_name, description, price, stock, photos) VALUES ('${product_name}', '${description}', '${price}', '${stock}', '${photos}')`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      res.json({
        payload: data,
        message: "Product added !",
      });
    }
  });
};

const updateProduct = (req, res) => {
  const { product_name, description, price, stock, photos } = req.body;
  const sql = `UPDATE tbl_products SET product_name = '${product_name}', description = '${description}', price = ${price}, stock = ${stock}, photos = '${photos}' WHERE product_name = '${product_name}'`;
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

const deleteProduct = (req, res) => {
  const { id_product } = req.body;
  const sql = `DELETE FROM tbl_products WHERE id_product = '${id_product}'`;
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
        message: "Cant Delete Data",
      });
    }
  });
};

module.exports = {
  getAllProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
