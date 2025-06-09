// File: src/components/showtimesModal/ShowtimesModal.tsx

import React, { useState, useEffect, useMemo } from "react";
import DateSelector from "../DateSelector/DateSelector";
import ShowtimesGroup from "../ShowtimesGroup/ShowtimesGroup";

// --- Các interface props vẫn giữ nguyên ---
export interface Showtime {
  time: string;
  availableSeats: number;
  format: string;
}
export interface SchedulePerDay {
  date: string;
  showtimes: Showtime[];
}
export interface ShowtimesModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
  cinemaName: string;
  scheduleData: SchedulePerDay[];
  onSelectShowtime: (selected: {
    date: string;
    time: string;
    format: string;
  }) => void;
}
// ------------------------------------------

const ShowtimesModal: React.FC<ShowtimesModalProps> = ({
  isOpen,
  onClose,
  movieTitle,
  cinemaName,
  scheduleData,
  onSelectShowtime,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const availableDates = useMemo(
    () => scheduleData.map((s) => s.date),
    [scheduleData]
  );

  useEffect(() => {
    if (isOpen && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [isOpen, availableDates]);

  const scheduleForSelectedDay = useMemo(() => {
    return scheduleData.find((d) => d.date === selectedDate);
  }, [selectedDate, scheduleData]);
  const handleShowtimeSelection = (showtime: {
    time: string;
    format: string;
  }) => {
    if (selectedDate) {
      onSelectShowtime({
        date: selectedDate,
        time: showtime.time,
        format: showtime.format,
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    // CẬP NHẬT: Thêm padding và hiệu ứng cho nền mờ
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* CẬP NHẬT: Tăng max-w để modal rộng hơn, bỏ overflow-hidden */}{" "}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CẬP NHẬT: Style lại header */}{" "}
        <div className="p-4 border-b border-gray-200 relative flex justify-between items-center">
          {" "}
          <h2 className="text-sm font-semibold text-gray-700 uppercase">
            LỊCH CHIẾU - {movieTitle}
          </h2>{" "}
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-800 transition-colors"
            aria-label="Đóng modal"
          >
            &times;{" "}
          </button>{" "}
        </div>
        {/* CẬP NHẬT: Bọc nội dung chính trong div có padding */}{" "}
        <div className="p-4 sm:p-6">
          {/* CẬP NHẬT: Style lại tên rạp */}{" "}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {cinemaName}
          </h1>{" "}
          <DateSelector
            dates={availableDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />{" "}
          <ShowtimesGroup
            scheduleForDay={scheduleForSelectedDay}
            onSelectShowtime={handleShowtimeSelection}
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ShowtimesModal;
