import React from "react";
import { Trophy, LogIn, User } from "lucide-react";

const Navbar = ({ isLoggedIn, onOpenLogin }) => {
  return (
    <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Trophy className="text-yellow-500" size={32} />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 uppercase tracking-tighter">
          Tournament Pro
        </span>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 text-slate-700 font-medium bg-slate-100 px-4 py-2 rounded-full">
            <User size={18} /> Admin
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-semibold"
          >
            <LogIn size={18} /> Đăng nhập
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
