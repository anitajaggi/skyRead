import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-cyan-400 text-center p-4">
      <div className="text-7xl mb-4" role="img" aria-label="robot">
        🤖
      </div>
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-xl mt-2 mb-6">
        Oops! Looks like this page took a coffee break.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="border-2 border-cyan-500 cursor-pointer px-6 py-2 rounded hover:bg-cyan-500 hover:text-gray-900 transition"
      >
        Take me Back
      </button>
    </div>
  );
};
