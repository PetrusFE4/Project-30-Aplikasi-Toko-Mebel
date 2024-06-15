const db = require("../library/database");
const jwt = require("jsonwebtoken");

const verifyTokenAndRole = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  });
};

const addRating = (req, res) => {
  const { id_user, id_product, rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating value" });
  }

  const sql = `INSERT INTO tbl_rating_product (id_user, id_product, rating) VALUES (?, ?, ?)`;

  db.query(sql, [id_user, id_product, rating], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        serverMessage: err,
      });
    }
    res.json({
      payload: { id_rating: result.insertId },
      message: "Rating added successfully",
    });
  });
};

module.exports = {
  addRating,
};
