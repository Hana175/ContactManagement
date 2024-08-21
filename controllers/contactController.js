const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public later will be private then authentication
// now we make the access private.

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
});

//@desc Get specific contacts
//@route GET /api/contacts
//@access public later will be private then authentication
// now we make the access private.
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: "Contact not found" });
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Get new contact
//@route POST /api/contacts
//@access public later will be private then authentication
// now we make the access private.

const createContact = asyncHandler(async (req, res) => {
  console.log("Request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "Please enter all fields" });
    throw new Error("Please enter all fields");
  } // if contact has nothing missing, then add it and create contact, the name will bind to the user's name and so on..
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json({ message: `Contact ${contact} Created` });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public later will be private then authentication
// now we make the access private.

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `Contact ${deletedContact} has been successfully deleted`,
  });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public later will be private then authentication
// now we make the access private.

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    message: `The contact ${updatedContact} has been successfully updated.`,
  });
});
module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
