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

        await db.query(
            `INSERT INTO tbl_carts (id_user, id_product, quantity) 
             VALUES (?, ?, ?) 
             ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
            [id_user, id_product, quantity, quantity]
        );

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
    try {
        const id_user = req.user.id;
        const [cart] = await db.query(
            `SELECT c.*, p.name, p.price 
             FROM tbl_carts c 
             JOIN tbl_products p ON c.id_product = p.id_product 
             WHERE c.id_user = ?`,
            [id_user]
        );

        if (cart.length === 0) {
            return res.status(404).json({ message: 'Keranjang kosong' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

const updateCart = async (req, res) => {
    try {
        const { id_product, quantity } = req.body;
        const id_user = req.user.id;

        const [result] = await db.query(
            `UPDATE tbl_carts SET quantity = ? 
             WHERE id_user = ? AND id_product = ?`,
            [quantity, id_user, id_product]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan di keranjang' });
        }

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

const deleteCart = async (req, res) => {
    try {
        const id_user = req.user.id;

        await db.query(
            `DELETE FROM tbl_carts 
             WHERE id_user = ?`,
            [id_user]
        );

        res.status(200).json({ message: 'Keranjang berhasil dihapus' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const { id_product } = req.body;
        const id_user = req.user.id;

        const [result] = await db.query(
            `DELETE FROM tbl_carts 
             WHERE id_user = ? AND id_product = ?`,
            [id_user, id_product]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan di keranjang' });
        }

        res.status(200).json({ message: 'Produk berhasil dihapus dari keranjang' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    deleteCart,
    deleteCartItem // Tambahkan ini untuk penghapusan item spesifik
};