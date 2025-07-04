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
          setArticleData((prev) => ({
            ...prev,
            [name]: null,
          }));
          return;
        }

        setFileError("");
        setArticleData((prev) => ({
          ...prev,
          [name]: file,
        }));
      } else {
        setArticleData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      if (fieldErrors[name]) {
        dispatch(clearFieldError(e.target.name));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let res;
      if (articleData.id) {
        res = await dispatch(
          updateArticle({
            id: articleData.id,
            articleData,
          })
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
      <form onSubmit={handleSubmit}>
        <div className="p-4 bg-white rounded shadow">
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border px-3 py-2 rounded w-full my-2"
          />
          {fieldErrors.title && (
            <p className="text-red-500 text-sm -mt-2 mb-2">
              {fieldErrors.title}
            </p>
          )}
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleChange}
            placeholder="Content"
            className="border px-3 py-2 rounded w-full my-2"
            rows="5"
          ></textarea>
          {fieldErrors.content && (
            <p className="text-red-500 text-sm -mt-2 mb-2">
              {fieldErrors.content}
            </p>
          )}
          <input
            type="text"
            value={articleData.tags.join(", ")}
            onChange={(e) =>
              setArticleData((prev) => ({
                ...prev,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              }))
            }
            name="tags"
            placeholder="Tag"
            className="border px-3 py-2 rounded w-full my-2"
          />
          {fieldErrors.tags && (
            <p className="text-red-500 text-sm -mt-2 mb-2">
              {fieldErrors.tags}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <select
                name="category"
                value={articleData.category}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full my-2"
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
                <p className="text-red-500 text-sm -mt-2 mb-2">
                  {fieldErrors.category}
                </p>
              )}
            </div>
            <div>
              <input
                type="file"
                name="imgUrl"
                onChange={handleChange}
                id="imgUrl"
                accept="image/*"
                className="border px-3 py-2 rounded w-full my-2"
              />
              {fileError && (
                <p className="text-red-500 text-sm -mt-2 mb-2">{fileError}</p>
              )}
              <div>
                {articleData.imgUrl && (
                  <img
                    src={
                      typeof articleData.imgUrl === "string"
                        ? articleData.imgUrl
                        : URL.createObjectURL(articleData.imgUrl)
                    }
                    alt="Article"
                    className="w-24 h-16 object-contain rounded border"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 my-2">
            <label htmlFor="publish">Publish now</label>
            <input
              type="checkbox"
              name="published"
              checked={articleData.published}
              onChange={(e) =>
                setArticleData((prev) => ({
                  ...prev,
                  published: e.target.checked,
                }))
              }
              id="publish"
              className="cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`text-white px-4 py-2 rounded focus:bg-gray-500 cursor-pointer ${
              loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
            }`}
          >
            {articleData.id ? "Update Article" : "Add Article"}
          </button>
        </div>
      </form>
    );
  }
);
