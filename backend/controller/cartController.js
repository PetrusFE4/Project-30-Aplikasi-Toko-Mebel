const db = require("../library/database");

const addToCart = async (req, res) => {
  try {
    const { id_product, quantity } = req.body;
    const id_user = req.user.id;

    // Cek apakah produk ada
    const [product] = await db.query("SELECT * FROM tbl_products WHERE id_product = ?", [id_product]);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    // Tambahkan atau update item di keranjang
    const sql = `
        INSERT INTO tbl_carts (id_user, id_product, quantity) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `;
    const params = [id_user, id_product, quantity, quantity];
    await db.query(sql, params);

    // Ambil data keranjang yang sudah diperbarui
    const [updatedCart] = await db.query(
      `SELECT c.*, p.name, p.price 
         FROM tbl_carts c 
         JOIN tbl_products p ON c.id_product = p.id_product 
         WHERE c.id_user = ?`,
      [id_user]
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getCart = async (req, res) => {
  const id_user = req.user.id;

  try {
    const sql = `
        SELECT c.*, p.name, p.price 
        FROM tbl_carts c 
        JOIN tbl_products p ON c.id_product = p.id_product 
        WHERE c.id_user = ?
    `;
    const [cartItems] = await db.query(sql, [id_user]);

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getSingleCart = async (req, res) => {
  const { id_cart } = req.params;
  const id_user = req.user.id;

  try {
    const sql = `
        SELECT c.*, p.name, p.price 
        FROM tbl_carts c 
        JOIN tbl_products p ON c.id_product = p.id_product 
        WHERE c.id_user = ? AND c.id_cart = ?
    `;
    const [cartItem] = await db.query(sql, [id_user, id_cart]);

    if (!cartItem) {
      return res.status(404).json({ message: 'Item keranjang tidak ditemukan' });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const updateCart = async (req, res) => {
  const { id_cart } = req.params;
  const { quantity } = req.body;
  const id_user = req.user.id;

  try {
    // Pastikan item keranjang ada sebelum diupdate
    const [cartItem] = await db.query(
      `SELECT * FROM tbl_carts WHERE id_user = ? AND id_cart = ?`,
      [id_user, id_cart]
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Item keranjang tidak ditemukan' });
    }

    // Update jumlah barang di keranjang
    const sql = `UPDATE tbl_carts SET quantity = ? WHERE id_user = ? AND id_cart = ?`;
    await db.query(sql, [quantity, id_user, id_cart]);

    // Ambil data keranjang yang sudah diperbarui
    const [updatedCartItem] = await db.query(
      `SELECT c.*, p.name, p.price 
         FROM tbl_carts c 
         JOIN tbl_products p ON c.id_product = p.id_product 
         WHERE c.id_user = ? AND c.id_cart = ?`,
      [id_user, id_cart]
    );

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const deleteCart = async (req, res) => {
  const id_user = req.user.id;

  try {
    // Hapus semua item keranjang pengguna
    const sql = `DELETE FROM tbl_carts WHERE id_user = ?`;
    await db.query(sql, [id_user]);

    res.status(200).json({ message: 'Keranjang berhasil dihapus' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const deleteCartItem = async (req, res) => {
  const { id_cart } = req.params;
  const id_user = req.user.id;

  try {
    // Pastikan item keranjang ada sebelum dihapus
    const [cartItem] = await db.query(
      `SELECT * FROM tbl_carts WHERE id_user = ? AND id_cart = ?`,
      [id_user, id_cart]
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Item keranjang tidak ditemukan' });
    }

    // Hapus item keranjang
    const sql = `DELETE FROM tbl_carts WHERE id_user = ? AND id_cart = ?`;
    await db.query(sql, [id_user, id_cart]);

    res.status(200).json({ message: 'Item keranjang berhasil dihapus' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  addToCart,
  getCart,
  getSingleCart,
  updateCart,
  deleteCart,
  deleteCartItem,
};
