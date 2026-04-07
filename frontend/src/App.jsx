import React from "react";
import { Trophy, LogIn } from "lucide-react";
import TournamentList from "./components/TournamentList"; // Nhập component vào đây

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar giữ nguyên */}
      <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500" size={32} />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            TOURNAMENT PRO
          </span>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium">
          <LogIn size={18} /> Đăng nhập
        </button>
      </nav>

      {/* Main Section */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
            Giải đấu đang diễn ra
          </h2>
          <p className="text-slate-500">
            Dữ liệu thực tế được cập nhật từ hệ thống quản lý.
          </p>
        </header>

        {/* THAY THẾ ĐOẠN [1,2,3].map BẰNG COMPONENT DƯỚI ĐÂY */}
        <TournamentList />
      </main>
    </div>
  );
}

export default App;
