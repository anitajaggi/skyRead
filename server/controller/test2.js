import cloudinary from "../middleware/cloudinary.js";
import articleModel from "../model/articleModel.js";
import fs from "fs/promises";
import { generateSlug } from "../utils/slugify.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, tags, published, category } = req.body;
    const author = req.user._id;

    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = tags.split(",").map((t) => t.trim());
      }
    }

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "articles",
      });

      imageUrl = result.secure_url;
      await fs.unlink(req.file.path);
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
    let { title, content, tags, published, category } = req.body;

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
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "articles",
      });

      existingArticle.imgUrl = result.secure_url;

      await fs.unlink(req.file.path);
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
