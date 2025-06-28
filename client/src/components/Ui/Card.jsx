import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchArticles } from "../../features/Article/articleThunk";

export const Card = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) return <p>Loading Articles...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const publishedArticles = articles?.filter((article) => article.published);

  const filteredArticles = selectedCategory
    ? publishedArticles.filter(
        (article) => article.category === selectedCategory
      )
    : publishedArticles;

  if (!filteredArticles || filteredArticles.length === 0) {
    return <p>No published articles available.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center md:justify-normal py-4">
      {filteredArticles.map((article, index) => (
        <div key={index} className="bg-white card h-fit shadow p-2 m-2 w-80">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 text-sm">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
            <span className="text-sm bg-pink-100 text-red-800 px-2">
              {article.category}
            </span>
            <span className="text-gray-700 font-semibold">
              {article.author?.username || "Unknown Author"}
            </span>
          </div>
          <NavLink to={`/articles/${article.slug}`} title="Read Article">
            <h2 className="text-xl mb-2 font-bold">{article.title}</h2>
            <img
              src={article.imgUrl}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <p className="text-black mt-2">
              {article.content.slice(0, 100) || "No summary available."}...
            </p>
          </NavLink>
          <div className="mt-2">
            {article.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 px-1 bg-blue-100">
                {article.tags.map((tag, i) => (
                  <span key={i} className="text-xs mr-2 mb-1 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
