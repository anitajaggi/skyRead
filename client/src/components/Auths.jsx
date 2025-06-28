import { useState } from "react";
import { LoginForm } from "./Ui/Login";
import { RegisterForm } from "./Ui/Register";

export const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-black border p-6 rounded-xl shadow">
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-lg cursor-pointer font-semibold ${
              activeTab === "login"
                ? "bg-red-600 text-black"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-lg cursor-pointer font-semibold ${
              activeTab === "register"
                ? "bg-red-600 text-black"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>
        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};
