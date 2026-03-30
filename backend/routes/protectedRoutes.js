const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Only logged-in users
router.get("/user", protect, (req, res) => {
  res.json({ msg: "User access granted", user: req.user });
});

// Only admin
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ msg: "Admin access granted" });
});

module.exports = router;