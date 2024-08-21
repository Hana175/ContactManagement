const express = require("express");
const { validateToken } = require("../middleware/validateTokenHandler");

const router = express.Router();
const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactController");

router.use(validateToken);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

router.route("/").get(getContacts).post(createContact);

module.exports = router;
