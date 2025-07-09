import { useState } from "react";
import { LoginForm } from "./Ui/Login";
import { RegisterForm } from "./Ui/Register";

export const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 p-6 rounded-xl">
        <div className="flex mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 py-2 text-sm font-medium transition-colors ${
              activeTab === "login"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-indigo-50"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 py-2 text-sm font-medium transition-colors ${
              activeTab === "register"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-indigo-50"
            }`}
          >
            Register
          </button>
        </div>

        <div className="animate-fade-in">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};
