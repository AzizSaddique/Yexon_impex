const express = require("express");
const router = express.Router();
const { sendContactMessage, getContactMessages } = require("../controllers/contactController");
const { ensureAdmin } = require("../middleware/authMiddleware");

router.post("/contact", sendContactMessage);
router.get("/contact", ensureAdmin, getContactMessages);

module.exports = router;
