const db = require('../library/database');

const getProfile = async (req, res) => {
  const id_user = req.user.id;

  try {
    const [results] = await db.execute('SELECT id_user, name, email FROM tbl_users WHERE id_user = ?', [id_user]);

    if (results.length === 0) {
      return res.status(404).json({ msg: 'Profil tidak ditemukan' });
    }

    const user = results[0];
    res.json(user);
  } catch (error) {
    console.error('Error querying database:', error.stack);
    res.status(500).send('Server Error');
  }
};

const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const id_user = req.user.id;

  try {
    const [results] = await db.execute('UPDATE tbl_users SET name = ?, email = ? WHERE id_user = ?', [name, email, id_user]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ msg: 'Profil tidak ditemukan' });
    }

    res.json({ msg: 'Profil berhasil diperbarui' });
  } catch (error) {
    console.error('Error querying database:', error.stack);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getProfile,
  updateProfile
};
