import cloudinary from "../middleware/cloudinary.js";
import articleModel from "../model/articleModel.js";
import { generateSlug } from "../utils/slugify.js";

export const createArticle = async (req, res) => {
  try {
    let { title, content, tags, published, category } = req.body;
    const author = req.user._id;

    // Convert tags to array
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = tags.split(",").map((t) => t.trim());
      }
    }

    let imageUrl = "";

    // Handle file upload
    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "articles",
      });

      imageUrl = result.secure_url;
    }

    const slug = generateSlug(title);

    const newArticle = new articleModel({
      title,
      content,
      author,
      tags,
      slug,
      published,
      category,
      imgUrl: imageUrl,
    });

    await newArticle.save();

    res.status(201).json({
      message: "Article created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Create Article Error:", error);
    res.status(500).json({
      message: "Error creating article",
      success: false,
    });
  }
};

export const getArticles = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 articles per page
  const skip = (page - 1) * limit;

  try {
    const total = await articleModel.countDocuments({ status: true });

    const articles = await articleModel
      .find({ status: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username email");

    res.status(200).json({
      success: true,
      data: articles,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching articles",
      success: false,
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, content, tags, published, category, imgUrl } = req.body;

    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = tags.split(",").map((t) => t.trim());
      }
    }

    const existingArticle = await articleModel.findById(id);
    if (!existingArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    existingArticle.title = title || existingArticle.title;
    existingArticle.content = content || existingArticle.content;
    existingArticle.tags = tags || existingArticle.tags;
    existingArticle.category = category || existingArticle.category;
    existingArticle.published =
      published !== undefined ? published : existingArticle.published;

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "articles",
      });

      existingArticle.imgUrl = result.secure_url;
    } else if (imgUrl && imgUrl.startsWith("data:image/")) {
      const result = await cloudinary.uploader.upload(imgUrl, {
        folder: "articles",
      });

      existingArticle.imgUrl = result.secure_url;
    } else if (imgUrl && !imgUrl.startsWith("http")) {
      existingArticle.imgUrl = imgUrl;
    }

    await existingArticle.save();

    res.status(200).json({
      message: "Article updated successfully",
      success: true,
      article: existingArticle,
    });
  } catch (error) {
    console.error("Update Article Error:", error);
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

export const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await articleModel
      .findOne({ slug, status: true, published: true })
      .populate("author", "username email");

    if (!article) {
      return res
        .status(404)
        .json({ message: "Article not found", success: false });
    }

    res.status(200).json({ article, success: true });
  } catch (error) {
    console.error("Get by Slug Error:", error);
    res.status(500).json({ message: "Error fetching article", success: false });
  }
};

export const updateArticlePublishStatus = async (req, res) => {
  try {
    const { published } = req.body;
    const article = await articleModel.findByIdAndUpdate(
      req.params.id,
      { published },
      { new: true }
    );
    res.status(200).json({
      success: true,
      article,
      message: "Publish status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating publish status",
      success: false,
    });
  }
};

export const deleteMultipleArticles = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "No IDs provided for deletion.", success: false });
    }

    const result = await articleModel.updateMany(
      { _id: { $in: ids } },
      { status: false }
    );
    res.status(200).json({
      message: "Articles deleted successfully!",
      success: true,
      result,
    });
  } catch (error) {
    console.error("Bulk Delete Error:", error);
    res.status(500).json({
      message: "Error deleting articles",
      success: false,
    });
  }
};
