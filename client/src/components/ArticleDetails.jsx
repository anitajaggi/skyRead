import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleBySlug } from "../features/Article/articleThunk";
import CommentSection from "./Ui/Comment";

export const ArticleDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { article } = useSelector((state) => state.articleDetails);

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug));
  }, [slug, dispatch]);

  if (!article)
    return (
      <div className="text-center text-gray-500 py-20 text-lg font-semibold">
        Article not found.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="text-sm text-gray-500 mb-6">
              By{" "}
              <span className="text-indigo-600 font-medium">
                {article.author?.username}
              </span>{" "}
              • {new Date(article.createdAt).toLocaleDateString()}
            </div>

            <img
              src={article.imgUrl || "/fallback.png"}
              alt={article.title}
              className="w-full rounded-lg mb-6 max-h-[500px] object-cover border"
            />

            <div className="prose prose-indigo max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
              {article?._id && <CommentSection postId={article._id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
