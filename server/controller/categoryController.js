import categoryModel from "../model/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const newCategory = new categoryModel({ category });
    await newCategory.save();
    return res
      .status(201)
      .json({ message: "Category created successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ status: true });
    return res.status(200).json({ categories, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    const updateCat = await categoryModel.findById(categoryId);
    updateCat.category = category || updateCat.category;
    await updateCat.save();
    return res
      .status(200)
      .json({ message: "Category updated successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const deleteCat = await categoryModel.findById(categoryId);
    deleteCat.status = false;
    await deleteCat.save();
    return res
      .status(200)
      .json({ message: "Category deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};
