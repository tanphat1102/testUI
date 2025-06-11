import React from "react";

export interface DateSelectorProps {
  dates: string[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

// CẬP NHẬT: Thay đổi cách format để phù hợp với giao diện mới
const formatDate = (
  dateString: string
): { day: string; month: string; dayOfWeek: string } => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  // CẬP NHẬT: Đổi tên ngày trong tuần để khớp với ảnh (T2, T3, T4, T5)
  const dayOfWeekNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayOfWeek = dayOfWeekNames[date.getDay()];
  return { day, month, dayOfWeek };
};

const DateSelector: React.FC<DateSelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    // CẬP NHẬT: Style lại container
    <div className="flex justify-start border-b border-gray-200 mb-6">
      <div className="flex items-center space-x-4 overflow-x-auto pb-px">
        {dates.map((dateStr) => {
          const { day, month, dayOfWeek } = formatDate(dateStr);
          const isActive = selectedDate === dateStr;
          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              // CẬP NHẬT: Toàn bộ style của button để khớp với thiết kế
              className={`text-center py-3 px-4 cursor-pointer transition-colors flex-shrink-0 border-b-2
            ${
              isActive
                ? "border-red-600 text-red-600" // Màu xanh đậm cho border và text khi active
                : "border-transparent text-gray-900 hover:text-gray-900" // Màu xám nhẹ cho inactive, hover
            }`}
            >
              {/* CẬP NHẬT: Cấu trúc HTML bên trong để khớp với thiết kế */}
              <div className=" items-center">
                <a
                  className={`text-4xl leading-none ${
                    isActive ? "font-semibold" : "font-semibold"
                  }`}
                >
                  {day}
                </a>
                <a
                  className={`text-lg leading-none mt-1 ${
                    isActive ? "font-bold" : "font-bold"
                  }`}
                >
                  /{month} - {dayOfWeek}
                </a>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;