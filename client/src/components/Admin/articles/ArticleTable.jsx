import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticle,
  fetchArticles,
} from "../../../features/Article/articleThunk";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";

export const ArticleTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);

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

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        {loading && <p>Loading Articles...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
                <td className="px-6 py-4">{article.title}</td>
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
                  {article.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 mb-1 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">{article.content.slice(0, 50)}...</td>
                <td className="px-6 py-4">{article.author.username}</td>
                <td
                  className={`px-6 py-4 font-bold ${
                    article.published ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {article.published ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="text-blue-600 cursor-pointer hover:text-blue-800 mr-2"
                    onClick={() => onEdit(article)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-600 cursor-pointer hover:text-red-800"
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
