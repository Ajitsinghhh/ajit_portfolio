const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET /api/messages - Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      error: "Failed to fetch messages",
    });
  }
});

// DELETE /api/messages/:id - Delete a message
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        error: "Message not found",
      });
    }

    res.json({
      message: "Message deleted successfully",
      data: deletedMessage,
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({
      error: "Failed to delete message",
    });
  }
});

module.exports = router;
