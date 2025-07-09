import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../features/comment/commentThunk";
import { NavLink } from "react-router-dom";

export default function CommentSection({ postId }) {
  const { comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (postId) {
      dispatch(getComments(postId));
    }
  }, [dispatch, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await dispatch(addComment({ postId, message }));
    setMessage("");
    dispatch(getComments(postId));
  };

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Leave a Comment
      </h2>

      {user ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              placeholder="Share your thoughts..."
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
              title="Send"
            >
              <BsFillSendFill size={18} />
            </button>
          </div>
        </form>
      ) : (
        <div className="text-gray-600 flex items-center gap-2 text-sm">
          <p>Please login to leave a comment.</p>
          <NavLink
            to="/auth"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            Login
          </NavLink>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">
          {comments?.length === 1
            ? "1 Comment"
            : `${comments?.length || 0} Comments`}
        </h3>

        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm uppercase">
                {comment.user?.username?.charAt(0) || "?"}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-indigo-700 font-semibold">
                    {comment.user?.username}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{comment.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
