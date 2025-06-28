import articleModel from "../model/articleModel.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, tags, published } = req.body;
    const author = req.user._id;

    let formatedimgUrl = "";

    if (req.file) {
      formatedimgUrl = `${req.protocol}://${req.get(
        "host"
      )}/${req.file.path.replace(/\\/g, "/")}`;
    }

    const newArticle = new articleModel({
      title,
      content,
      author,
      tags,
      published,
      imgUrl: formatedimgUrl,
    });

    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error creating article", success: false });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await articleModel
      .find({ status: true })
      .populate("author", "username email");
    res.status(200).json({ articles, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching articles", success: false });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, published } = req.body;

    const updateArticle = await articleModel.findById(id);
    if (!updateArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    updateArticle.title = title || updateArticle.title;
    updateArticle.content = content || updateArticle.content;
    updateArticle.tags = tags || updateArticle.tags;
    updateArticle.published =
      published !== undefined ? published : updateArticle.published;
    if (req.file) {
      updateArticle.imgUrl = `${req.protocol}://${req.get(
        "host"
      )}/${req.file.path.replace(/\\/g, "/")}`;
    }

    await updateArticle.save();
    res.status(200).json({
      message: "Article updated successfully",
      success: true,
      article: updateArticle,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating article", success: false });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const delArticle = await articleModel.findById(id);
    delArticle.status = false;
    await delArticle.save();
    res
      .status(200)
      .json({ message: "Article deleted successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting article!", success: false });
  }
};
