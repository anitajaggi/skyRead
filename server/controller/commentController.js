import Comment from "../model/commentModel.js";
import articleModel from "../model/articleModel.js";

export const addComment = async (req, res) => {
  const { message } = req.body;
  const { postId } = req.params;
  const userId = req.user._id;

  if (!message || !message.trim()) {
    return res.status(400).json({ message: "Comment message is required" });
  }

  try {
    const postExists = await articleModel.findById(postId);
    if (!postExists) return res.status(404).json({ message: "Post not found" });

    const comment = new Comment({
      user: userId,
      post: postId,
      message,
    });

    await comment.save();

    res.status(201).json({
      message: "Comment submitted!",
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to post comment",
      success: false,
    });
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId, status: true })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};

export const getAllComments = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const totalComments = await Comment.countDocuments({ status: true });
    const totalPages = Math.ceil(totalComments / limit);

    const comments = await Comment.find({ status: true })
      .populate("user", "username email")
      .populate("post", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      comments,
      totalComments,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleteComment = await Comment.findById(commentId);
    deleteComment.status = false;
    deleteComment.save();
    return res
      .status(200)
      .json({ message: "Comment deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try Again.", success: false });
  }
};

export const deleteMultipleComments = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "No IDs provided for deletion.",
        success: false,
      });
    }

    const result = await Comment.updateMany(
      { _id: { $in: ids } },
      { status: false }
    );

    return res.status(200).json({
      message: `${result.modifiedCount} comment(s) deleted successfully!`,
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Bulk delete failed.",
      success: false,
    });
  }
};
