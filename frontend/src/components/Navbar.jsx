import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Layers3,
  UserCircle,
  LayoutGrid,
  FileText,
  LogIn,
  ChevronDown,
} from "lucide-react";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Dùng để xác định trang hiện tại và active link

  // State để điều khiển dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);

  // Hàm helper để tạo các link menu một cách sạch sẽ
  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 font-medium transition-colors
          ${
            isActive
              ? "text-blue-700 font-semibold bg-blue-50/50"
              : "hover:text-slate-900 hover:bg-slate-100"
          }`}
      >
        <Icon
          size={20}
          className={isActive ? "text-blue-600" : "text-slate-400"}
        />
        {children}
      </Link>
    );
  };

  const handleLogoutClick = () => {
    onLogout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    // container ngoài để căn giữa và tạo khoảng trống
    <div className="w-full flex justify-center pt-6 px-4 md:px-12 sticky top-0 z-50">
      {/* Cái "Vỏ" Navbar nổi và bo tròn lớn */}
      <nav className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-2xl shadow-slate-200/50 px-6 py-4 rounded-[32px] w-full max-w-[1280px] flex justify-between items-center transition-all">
        {/* Bên trái: Tên thương hiệu */}
        <Link to="/" className="flex flex-col items-start gap-1">
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700 tracking-tighter uppercase leading-none">
            Material
          </span>
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tighter uppercase leading-none -mt-1.5">
            Tailwind
          </span>
        </Link>

        {/* Giữa: Các Menu Links (Sẽ ẩn trên mobile) */}
        <div className="hidden lg:flex items-center gap-4 border-l border-r border-slate-100 px-6 h-10">
          <NavLink to="/pages" icon={Layers3}>
            Pages <ChevronDown size={16} className="text-slate-400 -ml-1" />
          </NavLink>
          <NavLink to="/account" icon={UserCircle}>
            Account
          </NavLink>
          <NavLink to="/blocks" icon={LayoutGrid}>
            Blocks
          </NavLink>
          <NavLink to="/docs" icon={FileText}>
            Docs
          </NavLink>
        </div>

        {/* Bên phải: Trạng thái Login/Profile */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            /* Hiển thị Avatar khi ĐÃ đăng nhập */
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 group p-1 bg-slate-100 rounded-full border border-slate-200 transition hover:border-slate-300"
              >
                {/* Thay bằng ảnh avatar thật nếu bạn có, đây là ảnh ví dụ */}
                <img
                  src="https://docs.material-tailwind.com/img/face-1.jpg" // Dùng ảnh từ Material Tailwind làm ví dụ
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white ring-1 ring-slate-200"
                />
                <span className="hidden sm:inline font-semibold text-sm text-slate-800 pr-1 group-hover:text-blue-700">
                  Quản trị viên
                </span>
                <ChevronDown
                  size={18}
                  className="text-slate-400 group-hover:text-slate-600 pr-1"
                />
              </button>

              {/* Dropdown Menu Đăng xuất */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-3 z-10 space-y-2 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="text-xs text-slate-400 px-2 py-1 font-medium">
                    Xin chào, Admin
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-600 font-semibold hover:bg-red-50/70 transition"
                  >
                    <LogIn size={18} /> Thoát tài khoản
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Hiển thị nút LOG IN khi CHƯA đăng nhập */
            <Link
              to="/login"
              className="text-slate-800 font-extrabold hover:text-blue-700 uppercase tracking-wider text-sm p-3 transition"
            >
              LOG IN
            </Link>
          )}

          {/* Icon menu mobile - Sẽ dùng để làm drawer sau này nếu bạn muốn */}
          <button className="lg:hidden p-3 text-slate-700 hover:text-blue-600">
            <LayoutGrid size={22} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
