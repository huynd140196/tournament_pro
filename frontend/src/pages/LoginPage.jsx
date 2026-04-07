import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thêm cái này để chuyển hướng
import { Lock, User, AlertCircle, ArrowLeft } from "lucide-react";

const LoginPage = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tournament-backend-ymj8.onrender.com/api/token/",
        {
          username,
          password,
        },
      );
      localStorage.setItem("access_token", response.data.access);
      onSuccess();
      navigate("/"); // Đăng nhập xong tự động quay về trang chủ
    } catch (err) {
      setError("Thông tin đăng nhập không chính xác!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white text-center">
          <h2 className="text-3xl font-bold">Đăng nhập</h2>
          <p className="text-blue-100 mt-2">Dành cho Quản trị viên</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="w-full mt-1 p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full mt-1 p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
            Xác nhận đăng nhập
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full text-slate-400 text-sm flex items-center justify-center gap-2 hover:text-slate-600"
          >
            <ArrowLeft size={16} /> Quay lại trang chủ
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
