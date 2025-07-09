import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";
import { useArticleTableLogic } from "./useArticleTableLogic";
import { Pagination } from "../../../utils/Pagination";

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
    <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-indigo-700">Articles</h2>
        {selectedArticles.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete Selected ({selectedArticles.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-indigo-50 text-xs uppercase text-indigo-600 border-b border-indigo-100">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedArticles.length === articles.length &&
                    articles.length > 0
                  }
                  className="accent-indigo-600"
                />
              </th>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Tags</th>
              <th className="p-4 text-left">Content</th>
              <th className="p-4 text-left">Author</th>
              <th className="p-4 text-center">Published</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedArticles.includes(article._id)}
                    onChange={() => handleCheckboxChange(article._id)}
                    className="accent-indigo-600"
                  />
                </td>
                <td className="p-4">{(currentPage - 1) * 10 + index + 1}</td>
                <td className="p-4">{article.category || "Uncategorized"}</td>
                <td className="p-4 font-medium text-gray-800">
                  {article.title.slice(0, 30)}...
                </td>
                <td className="p-4">
                  {article.imgUrl ? (
                    <img
                      src={article.imgUrl}
                      alt={article.title}
                      className="w-20 h-14 object-cover rounded border"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex gap-1 flex-wrap">
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">{article.content.slice(0, 30)}...</td>
                <td className="p-4">{article.author.username}</td>
                <td className="text-center p-4">
                  <input
                    type="checkbox"
                    className="accent-green-600 cursor-pointer"
                    checked={article.published}
                    onChange={() =>
                      handleTogglePublish(article._id, !article.published)
                    }
                  />
                </td>
                <td className="text-center p-4">
                  <div className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(article)}
                      className="text-indigo-600 border border-indigo-500 rounded-full p-1 hover:bg-indigo-100 transition cursor-pointer"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(article._id)}
                      className="text-red-600 border border-red-500 rounded-full p-1 cursor-pointer hover:bg-red-100 transition"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />

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
