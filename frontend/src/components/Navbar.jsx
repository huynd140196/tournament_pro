import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trophy, LogIn, LogOut, User, Home } from "lucide-react";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); // Gọi hàm xóa localStorage ở App.jsx
    navigate("/"); // Đẩy về trang chủ sau khi đăng xuất
  };

  return (
    <nav className="bg-white shadow-sm border-b px-6 md:px-12 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Bên trái: Logo và Tên */}
      <Link
        to="/"
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        <Trophy className="text-yellow-500" size={32} />
        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tighter uppercase">
          Tournament Pro
        </span>
      </Link>

      {/* Bên phải: Các nút điều hướng */}
      <div className="flex items-center gap-3 md:gap-6">
        <Link
          to="/"
          className="hidden md:flex items-center gap-1 text-slate-600 font-medium hover:text-blue-600 transition"
        >
          <Home size={18} /> Trang chủ
        </Link>

        {isLoggedIn ? (
          /* Hiển thị khi ĐÃ đăng nhập */
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold border border-blue-100">
              <User size={18} />
              <span className="hidden sm:inline">Quản trị viên</span>
            </div>

            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-medium transition py-2 px-1"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Thoát</span>
            </button>
          </div>
        ) : (
          /* Hiển thị khi CHƯA đăng nhập */
          <Link
            to="/login"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200 font-bold active:scale-95"
          >
            <LogIn size={18} />
            <span>Đăng nhập</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
