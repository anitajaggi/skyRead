import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createArticle,
  fetchArticles,
  updateArticle,
} from "../../../features/Article/articleThunk";
import { clearFieldError } from "../../../features/Article/articleSlice";
import { fetchAllCategories } from "../../../features/categories/categoryThunks";

export const ArticleForm = forwardRef(
  (
    { selectArticle, clearSelection, setActiveTab, tabs, page = 1, limit = 10 },
    ref
  ) => {
    const [articleData, setArticleData] = useState({
      title: "",
      content: "",
      tags: [],
      imgUrl: null,
      published: false,
      category: "",
    });
    const [fileError, setFileError] = useState("");
    const dispatch = useDispatch();
    const { fieldErrors } = useSelector((state) => state.articles);
    const { allCategories, loading } = useSelector((state) => state.category);

    useEffect(() => {
      dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
      if (selectArticle) {
        setArticleData({
          id: selectArticle._id,
          title: selectArticle.title || "",
          content: selectArticle.content || "",
          tags: selectArticle.tags || [],
          imgUrl: selectArticle.imgUrl || null,
          published: selectArticle.published || false,
          category: selectArticle.category || "",
        });
      }
    }, [selectArticle]);

    const handleChange = (e) => {
      const { name, value, type, files } = e.target;

      if (type === "file") {
        const file = files[0];
        if (file && file.size > 5 * 1024 * 1024) {
          setFileError("Image must be less than 5MB.");
          setArticleData((prev) => ({ ...prev, [name]: null }));
          return;
        }

        setFileError("");
        setArticleData((prev) => ({ ...prev, [name]: file }));
      } else {
        setArticleData((prev) => ({ ...prev, [name]: value }));
      }

      if (fieldErrors[name]) {
        dispatch(clearFieldError(name));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let res;

      if (articleData.id) {
        res = await dispatch(
          updateArticle({ id: articleData.id, articleData })
        );
        if (updateArticle.fulfilled.match(res)) {
          setActiveTab(Object.keys(tabs)[0]);
        }
      } else {
        res = await dispatch(createArticle(articleData));
      }

      if (res.meta.requestStatus === "fulfilled") {
        await dispatch(fetchArticles({ page, limit }));
        clearSelection?.();
        setArticleData({
          id: undefined,
          title: "",
          content: "",
          tags: [],
          imgUrl: null,
          published: false,
          category: "",
        });
        setActiveTab(Object.keys(tabs)[0]);
      }
    };

    return (
      <form onSubmit={handleSubmit} ref={ref}>
        <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={articleData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {fieldErrors.title && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
            )}
          </div>

          <div>
            <textarea
              name="content"
              value={articleData.content}
              onChange={handleChange}
              placeholder="Content"
              rows="5"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {fieldErrors.content && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.content}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="tags"
              value={articleData.tags.join(", ")}
              onChange={(e) =>
                setArticleData((prev) => ({
                  ...prev,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                }))
              }
              placeholder="Tags (comma separated)"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {fieldErrors.tags && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.tags}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="category"
                value={articleData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option disabled value="">
                  Select Category
                </option>
                {allCategories?.map((cat, index) => (
                  <option key={index} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
              {fieldErrors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.category}
                </p>
              )}
            </div>

            <div>
              <input
                type="file"
                name="imgUrl"
                onChange={handleChange}
                accept="image/*"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              />
              {fileError && (
                <p className="text-red-500 text-sm mt-1">{fileError}</p>
              )}
              {articleData.imgUrl && (
                <div className="mt-2">
                  <img
                    src={
                      typeof articleData.imgUrl === "string"
                        ? articleData.imgUrl
                        : URL.createObjectURL(articleData.imgUrl)
                    }
                    alt="Article"
                    className="w-28 h-20 object-contain border rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={articleData.published}
              onChange={(e) =>
                setArticleData((prev) => ({
                  ...prev,
                  published: e.target.checked,
                }))
              }
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="published" className="text-sm text-gray-700">
              Publish now
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto inline-block px-6 py-2 rounded-lg text-white font-medium transition cursor-pointer ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {articleData.id ? "Update Article" : "Add Article"}
          </button>
        </div>
      </form>
    );
  }
);
