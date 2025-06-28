import mongoose from "mongoose";
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
    published: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.pre("save", function (next) {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  } else if (!this.published) {
    this.publishedAt = null;
  }
  next();
});

export default mongoose.model("Article", articleSchema);
