const db = require('../library/database');
require('dotenv').config();

// Fungsi untuk mengambil semua riwayat transaksi
const getAllTransactionHistories = (req, res) => {
    const id_user = req.user.id_user;

    db.getConnection()
        .then(connection => {
            return connection.execute(
                `SELECT th.*, op.id_product, p.product_name, p.price
                 FROM tbl_transaction_historys th
                 JOIN tbl_orders op ON th.id_order = op.id_order
                 JOIN tbl_products p ON op.id_product = p.id_product
                 WHERE th.id_user = ?`,
                [id_user]
            )
            .then(([rows]) => {
                res.status(200).json(rows);
                return connection.end();
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
                return connection.end();
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

// Fungsi untuk mengambil riwayat transaksi berdasarkan ID
const getTransactionHistoryById = (req, res) => {
    const { id_riwayat } = req.params;
    const id_user = req.user.id_user;

    db.getConnection()
        .then(connection => {
            return connection.execute(
                `SELECT th.*, op.id_product, p.product_name, p.price
                 FROM tbl_transaction_historys th
                 JOIN tbl_orders op ON th.id_order = op.id_order
                 JOIN tbl_products p ON op.id_product = p.id_product
                 WHERE th.id_riwayat = ? AND rt.id_user = ?`,
                [id_riwayat, id_user]
            )
            .then(([rows]) => {
                if (rows.length === 0) {
                    res.status(404).json({ message: 'Transaction history not found' });
                } else {
                    res.status(200).json(rows[0]);
                }
                return connection.end();
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
                return connection.end();
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

// Fungsi untuk membuat riwayat transaksi baru
const createTransactionHistory = (req, res) => {
    const { id_order, total, status } = req.body;
    const id_user = req.user.id_user;

    db.getConnection()
        .then(connection => {
            return connection.execute(
                `INSERT INTO tbl_transaction_historys (id_user, id_order, total, status) VALUES (?, ?, ?, ?)`,
                [id_user, id_order, total, status]
            )
            .then(([result]) => {
                res.status(201).json({ id_riwayat: result.insertId, id_user, id_order, total, status });
                return connection.end();
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
                return connection.end();
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

// Fungsi untuk memperbarui riwayat transaksi
const updateTransactionHistory = (req, res) => {
    const { id_riwayat } = req.params;
    const { total, status } = req.body;
    const id_user = req.user.id_user;

    db.getConnection()
        .then(connection => {
            return connection.execute(
                `UPDATE tbl_transaction_historys SET total = ?, status = ? WHERE id_riwayat = ? AND id_user = ?`,
                [total, status, id_riwayat, id_user]
            )
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Transaction history not found or not authorized' });
                } else {
                    res.status(200).json({ message: 'Transaction history updated successfully' });
                }
                return connection.end();
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
                return connection.end();
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

// Fungsi untuk menghapus riwayat transaksi
const deleteTransactionHistory = (req, res) => {
    const { id_riwayat } = req.params;
    const id_user = req.user.id_user;

    db.getConnection()
        .then(connection => {
            return connection.execute(
                `DELETE FROM tbl_transaction_historys WHERE id_riwayat = ? AND id_user = ?`,
                [id_riwayat, id_user]
            )
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Transaction history not found or not authorized' });
                } else {
                    res.status(204).json();
                }
                return connection.end();
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
                return connection.end();
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

module.exports = {
    getAllTransactionHistories,
    getTransactionHistoryById,
    createTransactionHistory,
    updateTransactionHistory,
    deleteTransactionHistory
};
