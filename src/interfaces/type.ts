// Định nghĩa cấu trúc cho một suất chiếu
export interface Showtime {
  time: string; // Ví dụ: "09:15"
  availableSeats: number;
  format: string; // Ví dụ: "2D PHỤ ĐỀ"
  // Thêm các thuộc tính khác nếu cần, ví dụ: type: "standard" | "vip"
}

// Định nghĩa cấu trúc cho lịch chiếu của một ngày
export interface SchedulePerDay {
  date: string; // Dùng định dạng chuẩn ISO 8601, ví dụ: "2025-06-08"
  showtimes: Showtime[];
}

// Định nghĩa props cho component modal chính
export interface ShowtimesModalProps {
  isOpen: boolean; // Prop để điều khiển việc đóng/mở modal
  onClose: () => void; // Hàm được gọi khi người dùng muốn đóng modal
  movieTitle: string;
  cinemaName: string;
  scheduleData: SchedulePerDay[]; // Mảng chứa dữ liệu lịch chiếu của nhiều ngày
  onSelectShowtime: (selected: { date: string; time: string; format: string }) => void; // Hàm xử lý khi người dùng chọn một suất chiếu
}