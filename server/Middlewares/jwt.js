const jwt = require("jsonwebtoken");

module.exports = {
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = { user };
      const options = {
        expiresIn: "1d",
      };
      jwt.sign(payload, process.env.JWT_SECRET_KEY, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      return res.json({ message: "Access Denied" });
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) return res.json({ message: err });
      next();
    });
  },
};
