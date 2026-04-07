import React, { useState } from "react";
import axios from "axios";
import { X, Lock, User, AlertCircle } from "lucide-react";

const LoginForm = ({ onClose, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Thay link này bằng link Backend Render của bạn
      const response = await axios.post(
        "https://tournament-backend-ymj8.onrender.com/api/token/",
        {
          username,
          password,
        },
      );

      // Lưu token vào localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", username);

      // Thông báo thành công cho component cha (App.jsx)
      onSuccess();
    } catch (err) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header của Modal */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-full transition"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold">Chào mừng trở lại</h2>
          <p className="text-blue-100 text-sm mt-1">
            Đăng nhập để quản lý giải đấu của bạn
          </p>
        </div>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Input Username */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Tên đăng nhập
              </label>
              <div className="relative mt-1">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="admin_hue"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Mật khẩu
              </label>
              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang xác thực..." : "Đăng nhập ngay"}
          </button>
        </form>

        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Quên mật khẩu? Liên hệ quản trị viên hệ thống.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
