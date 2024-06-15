const authRole = (requiredRole) => (req, res, next) => {
    const { role } = req.user;
  
    if (role !== requiredRole) {
      return res.status(403).json({ message: 'Anda tidak memiliki izin untuk akses ini' });
    }
  
    next();
  };
  
  module.exports = authRole;
  