const express = require("express");
const { sendContactMail } = require("../controllers/contact.controller.js");

const router = express.Router();

router.post("/", sendContactMail);

module.exports = router;
