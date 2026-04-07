import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Trophy, LogIn, LogOut, User, Home, Menu, X } from "lucide-react";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tự động đóng menu mobile khi đổi trang
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  const navLinks = [{ name: "Trang chủ", path: "/", icon: Home }];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 1. Bên trái: Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-yellow-100 p-1.5 rounded-lg group-hover:bg-yellow-200 transition-colors">
              <Trophy className="text-yellow-600" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              Tournament Pro
            </span>
          </Link>

          {/* 2. Giữa: Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. Bên phải: Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    Admin
                  </span>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1 text-sm font-medium"
                >
                  <LogOut size={18} /> Thoát
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
              >
                <LogIn size={18} /> Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-inner">
          <Link
            to="/"
            className="flex items-center gap-3 text-slate-700 font-semibold p-2"
          >
            <Home size={20} /> Trang chủ
          </Link>
          <hr className="border-slate-50" />
          {isLoggedIn ? (
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 text-red-600 font-semibold p-2"
            >
              <LogOut size={20} /> Đăng xuất tài khoản
            </button>
          ) : (
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold"
            >
              <LogIn size={20} /> Đăng nhập
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
