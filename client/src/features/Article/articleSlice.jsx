import { createSlice } from "@reduxjs/toolkit";
import {
  createArticle,
  deleteArticle,
  deleteMultipleArticles,
  fetchArticles,
  updateArticle,
  updateArticlePublishStatus,
} from "./articleThunk";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    loading: false,
    fieldErrors: {},
    articles: [],
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0,
  },
  reducers: {
    clearFieldError: (state, action) => {
      delete state.fieldErrors?.[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle article creation
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles.push(action.payload);
        state.fieldErrors = {};
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      // Handle fetching articles with pagination
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalArticles = action.payload.total;
      })

      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleting an article
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = state.articles.filter(
          (article) => article._id !== action.payload._id
        );
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updating an article
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.articles.findIndex((article) => {
          return article._id === action.payload._id;
        });
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        state.fieldErrors = {};
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      // Handle updating article publish status
      .addCase(updateArticlePublishStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArticlePublishStatus.fulfilled, (state, action) => {
        const updated = action.payload.article;
        const index = state.articles.findIndex((a) => a._id === updated._id);
        if (index !== -1) {
          state.articles[index].published = updated.published;
        }
      })
      .addCase(updateArticlePublishStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle multiple article deletion
      .addCase(deleteMultipleArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = state.articles.filter(
          (article) => !action.payload.includes(article._id)
        );
      })
      .addCase(deleteMultipleArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default articleSlice.reducer;
export const { clearFieldError } = articleSlice.actions;
