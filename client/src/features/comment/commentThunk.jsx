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

export const getAllComments = createAsyncThunk(
  "comment/getAllComments",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `/comments?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching all comments!"
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/comments/${commentId}`);
      toast.success(response.data.message || "Comment deleted successfully!");
      return commentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting comment!"
      );
    }
  }
);

// export const deleteMultipleComments = createAsyncThunk(
//   "comment/deleteMultipleComments",
//   async (ids, { rejectWithValue }) => {
//     console.log(ids);

//     try {
//       const response = await axiosApi.delete("/comments/bulkdelete", {
//         data: { ids },
//       });
//       toast.success(response.data.message || "Comments deleted successfully!");
//       return ids;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Error deleting comments!"
//       );
//     }
//   }
// );

export const deleteMultipleComments = createAsyncThunk(
  "comment/deleteMultipleComments",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/comments/bulk-delete", {
        ids,
      });

      toast.success(response.data.message || "Comments deleted successfully!");
      return ids;
    } catch (error) {
      console.error("Delete error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error deleting comments!"
      );
    }
  }
);
