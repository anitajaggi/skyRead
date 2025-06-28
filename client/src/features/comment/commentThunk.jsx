import axiosApi from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ postId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(`/comments/${postId}`, { message });
      toast.success(response.data.message || "Comment added successfully!");
      return response.data.comment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding comment!"
      );
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/comments/${postId}`);
      return response.data.comments;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching comments!"
      );
    }
  }
);
