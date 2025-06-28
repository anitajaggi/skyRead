import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/api";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/users/login", userData);
      toast.success(response.data.message || "Login Successful");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Login Failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/users/", userData);
      toast.success(response.data.message || "Registration Successful");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Registration Failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/users/logout");
      toast.success(response.data.message || "Logout Successful");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Logout Failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const currentUser = createAsyncThunk(
  "auth/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/users/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put("/users/profile", userData);
      toast.success(response.data.message || "Profile Updated");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Profile Update Failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "auth/deleteUserById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete(`/users/${id}`);
      toast.success(res.data.message || "User deleted successfully");
      return { _id: id };
    } catch (error) {
      return rejectWithValue(error.message || "Error deleting category");
    }
  }
);

export const updateUserById = createAsyncThunk(
  "auth/updateUserById",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put(`/users/${id}`, data);
      toast.success(response.data.message || "User updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Error updating user");
      return rejectWithValue(error.response.data);
    }
  }
);
