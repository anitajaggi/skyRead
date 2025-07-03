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
    <div className="bg-white mt-5">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Leave a Comment</h2>
      {user ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              placeholder="Your comment"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400"
            />
            <button
              type="submit"
              className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <BsFillSendFill />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex gap-2">
          <p className="text-gray-500">Please login to leave a comment.</p>
          <NavLink to={"/auth"} className="text-red-600 underline">
            Login
          </NavLink>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          {comments?.length === 1
            ? "1 Comment"
            : `${comments?.length || 0} Comments`}
        </h3>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="border border-gray-200 p-2 rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-800">
                  {comment.user?.username}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
