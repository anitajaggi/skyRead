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
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const totalContacts = await contactModel.countDocuments({ status: true });

    const totalPages = Math.ceil(totalContacts / limit);

    const contacts = await contactModel
      .find({ status: true })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      contacts,
      currentPage: page,
      totalPages,
      totalContacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Try Again.",
    });
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

export const deleteMultipleContacts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided for deletion." });
    }

    const result = await contactModel.updateMany(
      { _id: { $in: ids } },
      { status: false }
    );

    return res.status(200).json({
      message: `${result.modifiedCount} Message(s) deleted successfully!`,
      result,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Bulk delete failed", success: false });
  }
};
