export const validateCategory = (req, res, next) => {
  const { category } = req.body;
  const errors = {};
  const trimmedCategory = category?.trim();
  if (!trimmedCategory) {
    errors.category = "Category name is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
