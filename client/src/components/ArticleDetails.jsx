import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleBySlug } from "../features/Article/articleThunk";
import CommentSection from "./Ui/Comment";

export const ArticleDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { article, loading, error } = useSelector(
    (state) => state.articleDetails
  );

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug));
  }, [slug, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!article) return <p>Not found</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          By {article.author?.username} |
          {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <img
          src={article.imgUrl || "/fallback.png"}
          alt={article.title}
          className="w-full mb-4 rounded"
        />
        <div>{article?.content}</div>
      </div>
      {article?._id && <CommentSection postId={article._id} />}
    </>
  );
};
