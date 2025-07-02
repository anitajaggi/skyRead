import axiosApi from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createArticle = createAsyncThunk(
  "article/createArticle",
  async (articleData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/articles", articleData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(
        response.data.message || "Article created successfully! 🚀"
      );
      return response.data.article;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return rejectWithValue({ fieldErrors: error.response.data.errors });
      }
      return rejectWithValue(
        error.response?.data?.message || "Error creating article"
      );
    }
  }
);

export const fetchArticles = createAsyncThunk(
  "article/fetchArticles",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `/articles?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching articles"
      );
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (articleId, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete(`/articles/${articleId}`);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "error deleting article"
      );
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async ({ id, articleData }, { rejectWithValue }) => {
    console.log("Updating article with ID:", id);

    try {
      const formData = new FormData();
      formData.append("title", articleData.title);
      formData.append("content", articleData.content);
      formData.append("published", articleData.published);
      formData.append("category", articleData.category);
      formData.append("tags", JSON.stringify(articleData.tags));
      if (articleData.imgUrl instanceof File) {
        formData.append("imgUrl", articleData.imgUrl);
      }

      const response = await axiosApi.put(`/articles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(
        response.data.message || "Article updated successfully! 🚀"
      );
      return response.data.article;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return rejectWithValue({ fieldErrors: error.response.data.errors });
      }
      return rejectWithValue(
        error.response?.data?.message || "Error creating article..."
      );
    }
  }
);

export const fetchArticleBySlug = createAsyncThunk(
  "article/fetchArticleBySlug",
  async (slug, thunkAPI) => {
    try {
      const res = await axiosApi.get(`/articles/${slug}`);
      return res.data.article;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateArticlePublishStatus = createAsyncThunk(
  "articles/updatePublishStatus",
  async ({ id, published }, thunkAPI) => {
    try {
      const res = await axiosApi.put(`/articles/${id}/publish`, { published });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
