// src/app/store.js
import { userReducer } from "../features/Auth/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";
// import allCatReducer from "../components/Admin/Category/allCatSlice";
import authReducer from "../features/Auth/authSlice";
import contactReducer from "../features/contact/contactSlice";
import articleReducer from "../features/Article/articleSlice";
import articleDetailsReducer from "../features/Article/articleSlugSlice";
import commentReducer from "../features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    users: userReducer,
    contacts: contactReducer,
    articles: articleReducer,
    articleDetails: articleDetailsReducer,
    comments: commentReducer,
    // allCategories: allCatReducer,
  },
});
