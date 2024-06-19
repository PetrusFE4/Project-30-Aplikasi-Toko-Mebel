const db = require("../library/database");

const orderProduct = async (req, res) => {
  try {
    const { id_product, quantity, status, price, total, payment, delivery } = req.body;
    const id_user = req.user.id_user;

    // Cek apakah produk tersedia
    const [products] = await db.query(
      "SELECT * FROM tbl_products WHERE id_product = ?",
      [id_product]
    );
    const product = products[0];

    if (!product) {
      return res.status(404).json({ message: "Product tidak ditemukan" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Stock Habis" });
    }

    // Insert ke tbl_order_products
    const sql = "INSERT INTO tbl_order_products (id_user, id_product, quantity, status, price, total, payment, delivery) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [id_user, id_product, quantity, status, price, total, payment, delivery]);

    // Kurangi stok produk
    const newStock = product.stock - quantity;
    await db.query("UPDATE tbl_products SET stock = ? WHERE id_product = ?", [newStock, id_product]);

    return res.json({
      payload: { order_id: result.insertId },
      message: "Order Berhasil",
    });
  } catch (error) {
    console.error("Error adding to order:", error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  orderProduct,
};


module.exports = {
    orderProduct
};
