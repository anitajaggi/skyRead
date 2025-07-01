export const validateArticle = (req, res, next) => {
  const { title, content, tags, category } = req.body;
  const errors = {};

  if (!title || title.trim() === "") {
    errors.title = "Title is required.";
  } else if (title.length < 5) {
    errors.title = "Title must be at least 5 characters long.";
  }

  if (!content || content.trim() === "") {
    errors.content = "Content is required.";
  } else if (content.length < 20) {
    errors.content = "Content must be at least 20 characters long.";
  }

  if (!tags || tags.length === 0) {
    errors.tags = "At least one tag is required.";
  } else if (typeof tags === "string") {
    try {
      JSON.parse(tags);
    } catch {
      errors.tags = "Tags must be a valid JSON array.";
    }
  }

  if (!category || category.trim() === "") {
    errors.category = "Category is required.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
