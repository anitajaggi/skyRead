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
    return (
      <p className="text-center mt-12 text-gray-500 text-lg">
        No published articles available.
      </p>
    );
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredArticles.map((article, index) => (
          <NavLink
            to={`/articles/${article.slug}`}
            key={index}
            className="group block bg-white border border-indigo-100 hover:shadow-xl transition-shadow rounded-xl overflow-hidden"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={article.imgUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-6 space-y-4">
              <span className="inline-block text-xs font-medium uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                {article.category}
              </span>

              <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                {article.title?.length > 80
                  ? `${article.title.slice(0, 80)}...`
                  : article.title || "Untitled"}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {article.content?.slice(0, 160) || "No summary available."}...
              </p>

              <div className="flex justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                <span>{article.author?.username || "Unknown"}</span>
                <span>
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="mt-12">
        <Pagination
          page={page}
          currentPage={currentPage}
          totalPages={totalPages}
          loading={loading}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
