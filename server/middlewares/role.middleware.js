// Middleware to authorize specific roles
const response = require('../utils/ResponseHandler')

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return response.error(res, 403, "Access denied: Insufficient permissions")
    }
    next();
  };
};

// Usage in routes
// app.delete('/api/users/:id', authenticate, authorize('admin'), deleteUserHandler);