const db = require("../library/database");

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
    const sql = "SELECT id_user, username, role FROM tbl_users";
    try {
        const [rows] = await db.query(sql);
        res.json({
            payload: rows,
            message: "Success GET all users",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

// Delete a user (Admin only)
const deleteUser = async (req, res) => {
    const { id_user } = req.body;
    const sql = `DELETE FROM tbl_users WHERE id_user = ?`;
    try {
        const [result] = await db.query(sql, [id_user]);
        if (result.affectedRows) {
            res.json({
                payload: { isSuccess: result.affectedRows },
                message: "Success Delete User",
            });
        } else {
            res.status(404).json({
                message: "User Not Found",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

// Update user role (Admin only)
const updateUserRole = async (req, res) => {
    const { id_user, role } = req.body;
    const sql = `UPDATE tbl_users SET role = ? WHERE id_user = ?`;
    try {
        const [result] = await db.query(sql, [role, id_user]);
        if (result.affectedRows) {
            res.json({
                payload: { isSuccess: result.affectedRows },
                message: "Success Update User Role",
            });
        } else {
            res.status(404).json({
                message: "User Not Found",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    const sql = "SELECT id_product, product_name, description, price, stock, photos FROM tbl_products";
    try {
        const [rows] = await db.query(sql);
        res.json({
            payload: rows,
            message: "Success GET all products",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};


// Create product
const createProduct = async (req, res) => {
    const { product_name, description, price, stock, photos, id_category } = req.body;
    
    try {
        let sql = `INSERT INTO tbl_products SET ?`;
        let values = {
            product_name,
            description,
            price,
            stock,
            photos,
            id_category
        };

        const result = await db.query(sql, values);

        res.json({
            payload: {
                isSuccess: result.affectedRows > 0,
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

// Update product
const updateProduct = async (req, res) => {
    const { id_product, product_name, description, price, stock, photos, id_category } = req.body;

    // Fetch existing product details first
    const fetchSql = `SELECT * FROM tbl_products WHERE id_product = ?`;
    try {
        const [fetchResult] = await db.query(fetchSql, [id_product]);
        if (!fetchResult.length) {
            return res.status(404).json({
                message: "Product Not Found",
            });
        }

        // Assign existing values if not provided in request body
        const newName = product_name !== undefined ? product_name : fetchResult[0].product_name;
        const newDesc = description !== undefined ? description : fetchResult[0].description;
        const newPrice = price !== undefined ? price : fetchResult[0].price;
        const newStock = stock !== undefined ? stock : fetchResult[0].stock;
        const newPhotos = photos !== undefined ? photos : fetchResult[0].photos;
        const newId_category = id_category !== undefined ? id_category : fetchResult[0].id_category;

        const updateSql = `UPDATE tbl_products SET product_name = ?, description = ?, price = ?, stock = ?, photos = ?, id_category = ? WHERE id_product = ?`;
        const [result] = await db.query(updateSql, [newName, newDesc, newPrice, newStock, newPhotos, newId_category, id_product]);

        if (result.affectedRows) {
            res.json({
                payload: { isSuccess: result.affectedRows },
                message: "Success Update Product",
            });
        } else {
            res.status(404).json({
                message: "Product Not Found",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};



// Delete product
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

// Get all categories
const getAllCategories = async (req, res) => {
    const sql = "SELECT id_category, category_name, photo FROM tbl_categorys";
    try {
        const [rows] = await db.query(sql);
        res.json({
            payload: rows,
            message: "Success GET all categories",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

// Create category
const createCategory = async (req, res) => {
    const { category_name, categorys, photo } = req.body;
    try {
      const sql = `INSERT INTO tbl_categorys (category_name, categorys, photo) VALUES (?, ?, ?)`;
      const result = await db.query(sql, [category_name, categorys, photo]);
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

// Update category
const updateCategory = async (req, res) => {
    const { id_category, category_name, categorys, photo } = req.body;

    // Fetch existing category details first
    const fetchSql = `SELECT * FROM tbl_categorys WHERE id_category = ?`;
    try {
        const [fetchResult] = await db.query(fetchSql, [id_category]);
        if (!fetchResult.length) {
            return res.status(404).json({
                message: "Category Not Found",
            });
        }

        // Use existing value if category_name is not provided in request body
        const newName = category_name !== undefined ? category_name : fetchResult[0].category_name;
        const newCategorys = categorys !== undefined ? categorys : fetchResult[0].categorys;
        const newPhoto = photo !== undefined ? photo : fetchResult[0].photo;

        const updateSql = `UPDATE tbl_categorys SET category_name = ?, categorys = ?, photo = ? WHERE id_category = ?`;
        const [result] = await db.query(updateSql, [newName, newCategorys, newPhoto, id_category]);

        if (result.affectedRows) {
            res.json({
                payload: { isSuccess: result.affectedRows },
                message: "Success Update Category",
            });
        } else {
            res.status(404).json({
                message: "Category Not Found",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};



// Delete category
const deleteCategory = async (req, res) => {
    const { id_category } = req.body;
    try {
        const sql = `DELETE FROM tbl_categorys WHERE id_category = ?`;
        const result = await db.query(sql, [id_category]);

        if (result.affectedRows) {
            res.json({
                payload: { isSuccess: result.affectedRows },
                message: "Success Delete Category",
            });
        } else {
            res.status(404).json({
                message: "Category Not Found",
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



// Get transaction history (Admin only)
const getTransactionHistory = async (req, res) => {
    const sql = `SELECT th.*, op.id_product, p.product_name, p.price
                 FROM transaction_history th
                 JOIN order_product op ON th.id_order = op.id_order
                 JOIN tbl_products p ON op.id_product = p.id_product`;
    try {
        const [rows] = await db.query(sql);
        res.json({
            payload: rows,
            message: "Success GET transaction history",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err,
        });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    updateUserRole,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getTransactionHistory,
};
