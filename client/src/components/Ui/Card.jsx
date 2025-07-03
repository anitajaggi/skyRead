import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchArticles } from "../../features/Article/articleThunk";
import { Pagination } from "../../utils/Pagination";

export const Card = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { articles, currentPage, totalPages, loading } = useSelector(
    (state) => state.articles
  );

  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    dispatch(fetchArticles({ page, limit }));
  }, [dispatch, page, limit]);

  const publishedArticles = articles?.filter((article) => article.published);

  const filteredArticles = selectedCategory
    ? publishedArticles.filter(
        (article) => article.category === selectedCategory
      )
    : publishedArticles;

  if (!filteredArticles || filteredArticles.length === 0) {
    return <p className="text-center mt-6">No published articles available.</p>;
  }

  return (
    <div className="mt-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, index) => (
          <div key={index}>
            <NavLink to={`/articles/${article.slug}`} title="Read Article">
              <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={article.imgUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {article.title?.length > 80
                      ? `${article.title.slice(0, 80)}...`
                      : article.title || "No title available."}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {article.content?.slice(0, 100) || "No summary available."}
                    ...
                  </p>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">
                      {article.author?.username || "Unknown Author"} •{" "}
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </article>
            </NavLink>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />
    </div>
  );
};
