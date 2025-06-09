// File: src/components/showtimesGroup/ShowtimesGroup.tsx

import React, { useMemo } from "react";
import type {
  SchedulePerDay,
  Showtime,
} from "../ShowtimesModal/ShowtimesModal";

interface ShowtimesGroupProps {
  scheduleForDay?: SchedulePerDay;
  onSelectShowtime: (showtime: { time: string; format: string }) => void;
}

const ShowtimesGroup: React.FC<ShowtimesGroupProps> = ({
  scheduleForDay,
  onSelectShowtime,
}) => {
  const groupedShowtimes = useMemo(() => {
    if (!scheduleForDay?.showtimes) return {};

    return scheduleForDay.showtimes.reduce((acc, showtime) => {
      (acc[showtime.format] = acc[showtime.format] || []).push(showtime);
      return acc;
    }, {} as Record<string, Showtime[]>);
  }, [scheduleForDay]);

  if (!scheduleForDay || scheduleForDay.showtimes.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        Không có suất chiếu cho ngày này.
      </p>
    );
  }

  return (
    // CẬP NHẬT: Tăng khoảng cách giữa các group
    <div className="space-y-6">
      {Object.entries(groupedShowtimes).map(([format, showtimes]) => (
        <div key={format}>
          {/* CẬP NHẬT: Style lại tiêu đề định dạng (2D, 3D...) */}
          <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">
            {format}
          </h3>
          {/* CẬP NHẬT: Tăng số cột trong grid */}
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {showtimes.map((showtime) => (
              <button
                key={showtime.time}
                onClick={() =>
                  onSelectShowtime({ time: showtime.time, format })
                }
                // CẬP NHẬT: Toàn bộ style của button suất chiếu
                className="border border-gray-300 bg-gray-50 rounded-md p-2 text-center transition-all duration-200 hover:border-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={showtime.availableSeats === 0} // Thêm: disable nút nếu hết ghế
              >
                {/* CẬP NHẬT: Style lại text bên trong */}
                <p className="font-bold text-base text-gray-900">
                  {showtime.time}
                </p>
                <p className="text-xs text-gray-500">
                  {showtime.availableSeats > 0
                    ? `${showtime.availableSeats} ghế trống`
                    : "Hết vé"}
                </p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowtimesGroup;
