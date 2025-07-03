import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticle,
  deleteMultipleArticles,
  fetchArticles,
  updateArticlePublishStatus,
} from "../../../features/Article/articleThunk";

// This custom hook encapsulates all the logic used by the ArticleTable component
export const useArticleTableLogic = () => {
  const dispatch = useDispatch();

  // Select article state from Redux
  const { articles, currentPage, totalPages, loading } = useSelector(
    (state) => state.articles
  );

  // Local UI state for delete confirmation
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [articleToDelete, setArticleDelete] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const refreshArticles = (pageToFetch) => {
    dispatch(fetchArticles({ page: pageToFetch, limit }));
  };

  // Fetch articles when the page changes
  useEffect(() => {
    refreshArticles(page);
  }, [dispatch, page, limit]);

  // Trigger confirmation modal on delete click
  const handleDeleteClick = (id) => {
    setArticleDelete(id);
    setIsConfirmOpen(true);
  };

  // Confirm and dispatch article deletion
  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    const res = await dispatch(deleteArticle(articleToDelete));

    if (deleteArticle.fulfilled.match(res)) {
      if (articles.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshArticles(page);
      }
    }
    setIsConfirmOpen(false);
    setArticleDelete(null);
  };

  // Select/deselect individual message
  const handleCheckboxChange = (id) => {
    setSelectedArticles((prev) =>
      prev.includes(id) ? prev.filter((artId) => artId !== id) : [...prev, id]
    );
  };

  // Toggle all message selection
  const handleSelectAll = () => {
    const allIds = articles.map((art) => art._id);
    setSelectedArticles((prev) =>
      prev.length === articles.length ? [] : allIds
    );
  };

  // Handle bulk deletion of selected articles
  const handleBulkDelete = async () => {
    if (selectedArticles.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  // Confirm and dispatch bulk deletion of selected articles
  const handleConfirmBulkDelete = async () => {
    const res = await dispatch(deleteMultipleArticles(selectedArticles));

    if (deleteMultipleArticles.fulfilled.match(res)) {
      setSelectedArticles([]);
      if (articles.length === selectedArticles.length && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshArticles(page);
      }
    }
    setIsMultiConfirmOpen(false);
  };

  // Toggle publish status of an article
  const handleTogglePublish = async (id, newStatus) => {
    try {
      const res = await dispatch(
        updateArticlePublishStatus({ id, published: newStatus })
      );
      if (updateArticlePublishStatus.fulfilled.match(res)) {
        refreshArticles(page);
      }
    } catch (err) {
      console.error("Failed to update publish status", err);
    }
  };

  return {
    articles,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    selectedArticles,
    isConfirmOpen,
    isMultiConfirmOpen,
    setIsConfirmOpen,
    setIsMultiConfirmOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleCheckboxChange,
    handleSelectAll,
    handleBulkDelete,
    handleConfirmBulkDelete,
    handleTogglePublish,
  };
};
