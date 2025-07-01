import contactModel from "../model/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    const newContact = new contactModel({ username, email, message });
    await newContact.save();

    return res
      .status(201)
      .json({ message: "Message sent successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try Again.", success: false });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({ status: true });
    return res.status(200).json({ contacts, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try Again.", success: false });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const deleteContact = await contactModel.findById(contactId);
    deleteContact.status = false;
    await deleteContact.save();
    return res
      .status(200)
      .json({ message: "Message deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try Again.", success: false });
  }
};
