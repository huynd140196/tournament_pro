import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Đảm bảo đã có Tailwind CSS

// THÊM DÒNG NÀY
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BAO BỌC APP TẠI ĐÂY */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
