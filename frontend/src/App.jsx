import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import TournamentList from "./components/TournamentList";
import LoginPage from "./pages/LoginPage"; // Chúng ta sẽ đổi tên LoginForm thành LoginPage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token"),
  );

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          {/* Trang chủ hiển thị danh sách giải đấu */}
          <Route
            path="/"
            element={
              <main className="max-w-6xl mx-auto py-12 px-6">
                <header className="mb-12 text-center">
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
                    Giải đấu đang diễn ra
                  </h2>
                  <p className="text-slate-500 text-lg font-light italic">
                    Chào mừng bạn đến với sân chơi của những nhà vô địch tại
                    Huế.
                  </p>
                </header>
                <TournamentList />
              </main>
            }
          />

          {/* Trang Đăng nhập riêng biệt */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginPage onSuccess={handleLoginSuccess} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
