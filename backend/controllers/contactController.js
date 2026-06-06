const { ContactMessage } = require("../models/ContactMessage");
const asyncHandler = require("../middleware/asyncHandler");

// POST /api/contact
const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }

  const created = await ContactMessage.create({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  res.status(201).json({ success: true, data: created });
});

// GET /api/contact
const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ success: true, data: messages });
});

module.exports = {
  sendContactMessage,
  getContactMessages,
};
