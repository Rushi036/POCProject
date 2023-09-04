const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the main Route! This means server is running properly!" });
});

module.exports = router;
