// ArticleTable.jsx
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";
import { useArticleTableLogic } from "./useArticleTableLogic";
import { Pagination } from "../../../utils/Pagination";

// Table component for displaying articles
export const ArticleTable = ({ onEdit }) => {
  const {
    articles,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    isConfirmOpen,
    selectedArticles,
    isMultiConfirmOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleTogglePublish,
    setIsConfirmOpen,
    handleSelectAll,
    handleCheckboxChange,
    setIsMultiConfirmOpen,
    handleBulkDelete,
    handleConfirmBulkDelete,
  } = useArticleTableLogic();

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Messages</h2>
        {selectedArticles.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-sm text-white px-2 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedArticles.length})
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedArticles.length === articles.length &&
                    articles.length > 0
                  }
                />
              </th>
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
              <tr key={article._id} className="border-b">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedArticles.includes(article._id)}
                    onChange={() => handleCheckboxChange(article._id)}
                  />
                </td>
                <td className="px-6 py-4">
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <td>{article?.category || "Uncategorized"}</td>
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

      {/* Pagination Controls */}
      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Article"
        description="Are you sure you want to delete this article? This action cannot be undone."
      />
      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Selected Articles"
        description={`Are you sure you want to delete ${selectedArticles.length} articles? This action cannot be undone.`}
      />
    </div>
  );
};
