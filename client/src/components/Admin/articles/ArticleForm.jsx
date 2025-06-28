import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createArticle,
  fetchArticles,
  updateArticle,
} from "../../../features/Article/articleThunk";
import { getAllCategories } from "../../../features/categories/categoryThunks";

export const ArticleForm = forwardRef(
  ({ selectArticle, clearSelection }, ref) => {
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

    const { categories, loading, error } = useSelector(
      (state) => state.category
    );

    useEffect(() => {
      dispatch(getAllCategories());
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
      } else {
        res = await dispatch(createArticle(articleData));
      }

      if (res.meta.requestStatus === "fulfilled") {
        await dispatch(fetchArticles());
        clearSelection?.();
      }
      setArticleData({
        id: undefined,
        title: "",
        content: "",
        tags: [],
        imgUrl: null,
        published: false,
        category: "",
      });
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
            required
            className="border px-3 py-2 rounded w-full my-2"
          />
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleChange}
            placeholder="Content"
            required
            className="border px-3 py-2 rounded w-full my-2"
            rows="5"
          ></textarea>
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
                {categories?.map((cat, index) => (
                  <option key={index} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {fileError && (
                <p className="text-red-500 text-sm -mt-2 mb-2">{fileError}</p>
              )}
              <input
                type="file"
                name="imgUrl"
                onChange={handleChange}
                id=""
                className="border px-3 py-2 rounded w-full my-2"
              />
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
