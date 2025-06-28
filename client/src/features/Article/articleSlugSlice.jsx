import { createSlice } from "@reduxjs/toolkit";
import { fetchArticleBySlug } from "./articleThunk";

const articleDetailsSlice = createSlice({
  name: "articleDetails",
  initialState: {
    article: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.article = null;
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleDetailsSlice.reducer;
