const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED TOKEN:", decoded); // 🔥 ADD THIS

      req.user = decoded;

      next();
    } catch (error) {
      console.log("TOKEN ERROR:", error.message); // 🔥 ADD THIS
      return res.status(401).json({ msg: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }
};