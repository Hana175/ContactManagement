const express = require("express");

const router = express.Router();
const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactController");

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

router.route("/").get(getContacts).post(createContact);

module.exports = router;
