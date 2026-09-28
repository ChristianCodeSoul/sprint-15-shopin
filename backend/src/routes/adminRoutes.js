const express = require("express");
const { getStats, getUsers, getOrders } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.get("/stats", protect, authorize("admin"), getStats);
router.get("/users", protect, authorize("admin"), getUsers);
router.get("/orders", protect, authorize("admin"), getOrders);

module.exports = router;