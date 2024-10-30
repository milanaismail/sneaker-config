const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET orders");
});

router.post("/", (req, res) => {
  res.send("POST orders");
});

router.put("/:id", (req, res) => {
  res.send("PUT orders");
});

router.delete("/:id", (req, res) => {
  res.send("DELETE orders");
});
