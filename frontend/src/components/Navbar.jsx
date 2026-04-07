import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, Menu } from "lucide-react";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogoutClick = () => {
    onLogout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-lg font-black text-slate-900 tracking-tight">
            Material
          </span>
          <span className="text-lg font-black text-blue-600 -mt-1 tracking-tight">
            Tailwind
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition px-2 py-1 rounded-full"
              >
                <img
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="hidden sm:block text-sm font-semibold text-slate-700">
                  Admin
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-2">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogIn size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-bold text-slate-800 hover:text-blue-600 transition"
            >
              LOGIN
            </Link>
          )}

          {/* Mobile menu icon */}
          <button className="lg:hidden text-slate-700 hover:text-blue-600">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
