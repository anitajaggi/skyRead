import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  deleteMultipleComments,
  getAllComments,
} from "../../../features/comment/commentThunk";

// Handles all logic and state for the Comments component
export const useCommentsLogic = () => {
  const dispatch = useDispatch();

  // Get comment-related state from Redux
  const { allComments, currentPage, totalPages, loading } = useSelector(
    (state) => state.comments
  );

  // Pagination and selection state
  const [page, setPage] = useState(1);
  const [selectedComments, setSelectedComments] = useState([]);

  // Deletion dialog states
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const limit = 10; // Comments per page

  // Fetch comments for current page
  const refreshComments = (pageToFetch) => {
    dispatch(getAllComments({ page: pageToFetch, limit }));
  };

  // Fetch comments on mount or when page changes
  useEffect(() => {
    refreshComments(page);
  }, [dispatch, page, limit]);

  // Handle single comment deletion
  const handleDeleteClick = (id) => {
    setCommentToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!commentToDelete) return;

    const res = await dispatch(deleteComment(commentToDelete));
    setIsConfirmOpen(false);
    setCommentToDelete(null);

    // If the last comment on a page was deleted
    if (deleteComment.fulfilled.match(res)) {
      if (allComments.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshComments(page);
      }
    }
  };

  // Select/deselect individual comment
  const handleCheckboxChange = (id) => {
    setSelectedComments((prev) =>
      prev.includes(id)
        ? prev.filter((commentId) => commentId !== id)
        : [...prev, id]
    );
  };

  // Toggle all comment selection
  const handleSelectAll = () => {
    const allIds = allComments.map((c) => c._id);
    setSelectedComments((prev) =>
      prev.length === allComments.length ? [] : allIds
    );
  };

  // Setup bulk delete
  const handleBulkDelete = () => {
    if (selectedComments.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleComments(selectedComments));

    if (deleteMultipleComments.fulfilled.match(res)) {
      setSelectedComments([]);

      if (allComments.length === selectedComments.length && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshComments(page);
      }
    }

    setIsMultiConfirmOpen(false);
  };

  return {
    allComments,
    currentPage,
    totalPages,
    loading,
    page,
    limit,
    setPage,
    selectedComments,
    isConfirmOpen,
    isMultiConfirmOpen,
    setIsConfirmOpen,
    setIsMultiConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleSelectAll,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  };
};
