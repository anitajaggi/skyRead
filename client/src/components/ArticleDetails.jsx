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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content (takes 2/3 on large screens) */}
          <div className="lg:col-span-2 md:border-r md:pr-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <p className="text-sm text-gray-500 mb-6">
              By <span className="font-medium">{article.author?.username}</span>{" "}
              • {new Date(article.createdAt).toLocaleDateString()}
            </p>

            <img
              src={article.imgUrl || "/fallback.png"}
              alt={article.title}
              className="w-full rounded-lg mb-6 max-h-[500px] object-cover"
            />

            <div className="prose max-w-none">
              {/* Assuming article.content is raw HTML or rich text */}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>

          {/* Comments Section */}
          <div className="lg:col-span-1">
            {article?._id && <CommentSection postId={article._id} />}
          </div>
        </div>
      </div>
    </>
  );
};
