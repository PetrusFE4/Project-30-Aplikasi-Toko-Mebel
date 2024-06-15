const db = require("../library/database");
const jwt = require("jsonwebtoken");

// Fungsi untuk memverifikasi token JWT dan peran pengguna
const verifyTokenAndRole = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  // Verifikasi token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Jika token valid, lanjutkan ke fungsi berikutnya
    next();
  });
};

// Fungsi untuk menambahkan komentar produk
const addComment = (req, res) => {
  const { id_user, id_product, comment } = req.body;

  // Query SQL untuk menambahkan komentar ke dalam tabel
  const sql = `INSERT INTO tbl_comment_product (id_user, id_product, comment) VALUES (?, ?, ?)`;
  
  // Eksekusi query
  db.query(sql, [id_user, id_product, comment], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        serverMessage: err,
      });
    }
    res.json({
      payload: { id_comment: result.insertId },
      message: "Comment added successfully",
    });
  });
};

module.exports = {
  addComment,
};
