
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};
const isStoreManager = (req, res, next) => {
  if (req.user && req.user.role === 'storeManager') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as store manager' });
  }
};



module.exports = { isAdmin , isStoreManager };
