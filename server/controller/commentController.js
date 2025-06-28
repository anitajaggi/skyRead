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
    const comments = await Comment.find({ post: postId })
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
