import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Calendar } from "lucide-react";

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi đến API Django đã chạy ở port 8000
    axios
      .get("https://tournament-backend-ymj8.onrender.com/tournaments/api/list/")
      .then((response) => {
        setTournaments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi gọi API:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-slate-500">
        Đang tải giải đấu...
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tournaments.map((t) => (
        <div
          key={t.id}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition cursor-pointer"
        >
          <div
            className="h-40 bg-slate-300 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=400&h=200)`,
            }}
          ></div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-slate-800">{t.name}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full font-bold ${t.status === "open" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
              >
                {t.status.toUpperCase()}
              </span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Users size={16} /> 16 Đội tham gia
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} /> Bắt đầu:{" "}
                {new Date(t.start_date).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TournamentList;
