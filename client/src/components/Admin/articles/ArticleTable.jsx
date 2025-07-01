import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticle,
  fetchArticles,
  updateArticlePublishStatus,
} from "../../../features/Article/articleThunk";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";

export const ArticleTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.articles);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [articleToDelete, setArticleDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setArticleDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    const res = await dispatch(deleteArticle(articleToDelete));
    if (deleteArticle.fulfilled.match(res)) {
      await dispatch(fetchArticles());
    }
    setIsConfirmOpen(false);
    setArticleDelete(null);
  };

  const handleTogglePublish = async (id, newStatus) => {
    try {
      await dispatch(updateArticlePublishStatus({ id, published: newStatus }));
    } catch (err) {
      console.error("Failed to update publish status", err);
    }
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Tags</th>
              <th className="px-6 py-3">Content</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Published</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{article.category}</td>
                <td className="px-6 py-4">{article.title.slice(0, 30)}...</td>
                <td className="py-2">
                  {article.imgUrl ? (
                    <img
                      src={article.imgUrl}
                      alt={article.title}
                      className="w-24 h-16 object-contain rounded border"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block text-xs text-blue-800 font-semibold">
                    {article.tags.slice(0, 2).join(", ")}
                    {article.tags.length > 2 && " ..."}
                  </span>
                </td>

                <td className="px-6 py-4">{article.content.slice(0, 30)}...</td>
                <td className="px-6 py-4">{article.author.username}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-white cursor-pointer"
                    checked={article.published}
                    onChange={() =>
                      handleTogglePublish(article._id, !article.published)
                    }
                  />
                </td>
                <td className="text-center py-6 flex justify-center gap-2">
                  <button
                    className="text-blue-600 border cursor-pointer border-blue-600 rounded-full p-1 hover:bg-blue-100"
                    onClick={() => onEdit(article)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-600 border cursor-pointer border-red-600 rounded-full p-1 hover:bg-red-100"
                    onClick={() => handleDeleteClick(article._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Article"
        description="Are you sure you want to delete this article? This action cannot be undone."
      />
    </div>
  );
};
