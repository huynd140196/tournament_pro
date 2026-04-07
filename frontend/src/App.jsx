import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TournamentList from "./components/TournamentList";
import LoginForm from "./components/LoginForm"; // Bạn sẽ tạo file này tiếp theo

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar isLoggedIn={isLoggedIn} onOpenLogin={() => setShowLogin(true)} />

      <main className="max-w-6xl mx-auto py-12 px-6">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
            Giải đấu đang diễn ra
          </h2>
          <p className="text-slate-500 text-lg font-light italic">
            Chào mừng bạn đến với sân chơi của những nhà vô địch tại Huế.
          </p>
        </header>

        <TournamentList />
      </main>

      {/* Hiển thị Form Đăng nhập nếu showLogin là true */}
      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;
