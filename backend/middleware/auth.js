const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const db = require('../library/database');

const verifyToken = async (req, res, next) => {
  try {
    // Dapatkan token dari header Authorization
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    // Verifikasi token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Simpan informasi pengguna yang terverifikasi ke dalam objek req
    req.user = decoded;

    // Cek apakah pengguna ada di database (opsional)
    const [user] = await db.query('SELECT * FROM tbl_users WHERE id_user = ?', [decoded.id_user]);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
