/**
 * Simple admin guard middleware.
 *
 * - If ADMIN_API_KEY is set, the request must provide the same value in the
 *   `x-admin-key` header.
 * - If ADMIN_API_KEY is unset, the middleware allows all requests (useful for local development).
 */

const ensureAdmin = (req, res, next) => {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    return next();
  }

  const requestKey = req.headers["x-admin-key"];
  if (requestKey && requestKey === adminKey) {
    return next();
  }

  res.status(403).json({ success: false, message: "Forbidden: admin access required" });
};

module.exports = {
  ensureAdmin,
};
