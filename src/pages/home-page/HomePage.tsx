// File: src/pages/HomePage.tsx

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react"; // THÊM MỚI: Import useState

// --- Import các components ---
import UserLayout from "../../components/layout/UserLayout";
import Carousel from "../../components/carousel/Carousel";
import MovieList from "../../components/movieGrid/MovieGrid"; // Giữ nguyên đường dẫn của bạn

// --- Import các kiểu dữ liệu ---


// --- Import service ---
import { fetchMovies } from "../../services/movieService";
import type { SchedulePerDay } from "../../interfaces/type";
import type { MovieCardProps } from "../../components/movieCard/MovieCard";
import ShowtimesModal from "../../components/ShowtimesModal/ShowtimesModal";


// THÊM MỚI: Dữ liệu lịch chiếu giả để demo
// Trong thực tế, bạn sẽ gọi một API khác để lấy dữ liệu này dựa vào ID phim
const mockScheduleData: SchedulePerDay[] = [
    {
        date: "2025-06-09",
        showtimes: [
            { time: "09:30", availableSeats: 50, format: "2D Phụ đề" },
            { time: "11:45", availableSeats: 30, format: "2D Phụ đề" },
            { time: "14:00", availableSeats: 45, format: "2D Phụ đề" },
            { time: "16:15", availableSeats: 12, format: "3D Lồng tiếng" },
            { time: "19:00", availableSeats: 60, format: "3D Lồng tiếng" },
            { time: "21:30", availableSeats: 25, format: "IMAX 3D" },
        ],
    },
    {
        date: "2025-06-10",
        showtimes: [
            { time: "10:00", availableSeats: 55, format: "2D Phụ đề" },
            { time: "13:15", availableSeats: 20, format: "2D Phụ đề" },
            { time: "17:00", availableSeats: 3, format: "3D Lồng tiếng" },
            { time: "20:45", availableSeats: 40, format: "IMAX 3D" },
        ],
    },
    {
        date: "2025-06-11",
        showtimes: [
            { time: "09:00", availableSeats: 0, format: "2D Phụ đề" },
            { time: "12:00", availableSeats: 18, format: "2D Phụ đề" },
            { time: "15:30", availableSeats: 33, format: "3D Lồng tiếng" },
            { time: "20:00", availableSeats: 28, format: "IMAX 3D" },
        ],
    },
];


function HomePage() {
  const movieBaner: string[] = [
    "https://weliveentertainment.com/wp-content/uploads/2025/04/minecraft-movie-banner.png",
    "https://files.betacorp.vn/media/images/2025/06/04/1702x621-13-104719-040625-85.png",
  ];

  // --- State quản lý modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieCardProps | null>(null);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovieCardProps[], Error>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  const allMovies = data?.pages.flat() ?? [];

  // --- Các hàm xử lý modal ---
  const handleBuyTicketClick = (movie: MovieCardProps) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleFinalShowtimeSelect = (selected: { date: string; time: string; format: string }) => {
    // Trong thực tế, bạn sẽ chuyển hướng đến trang đặt vé hoặc xử lý tiếp
    alert(
      `Bạn đã chọn phim "${selectedMovie?.title}"\nSuất chiếu: ${selected.time} - ${selected.date}\nĐịnh dạng: ${selected.format}`
    );
    handleCloseModal();
  };


  return (
    <UserLayout>
      <Carousel autoplayInterval={2000} images={movieBaner} height={"600px"} />

      {/* CẬP NHẬT: Truyền hàm xử lý vào MovieList */}
      <MovieList
        movies={allMovies}
        cardsPerRow={4}
        onMovieBuyTicketClick={handleBuyTicketClick}
      />

      <div className="flex justify-center m-4">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-8 py-3 bg-gradient-to-r from-red-700 via-red-600 to-red-500 shadow-3xl shadow-amber-50 hover:brightness-110 text-white font-bold rounded-md 
                     transition duration-200 flex items-center justify-center text-base relative mt-4
                     cursor-pointer"
          >
            {isFetchingNextPage || isLoading ? "Đang tải..." : "Hiển thị thêm"}
          </button>
        )}
        {!hasNextPage && !isLoading && ( // Thêm điều kiện !isLoading để không hiện khi đang tải lần đầu
          <p className="text-center text-gray-500 mt-4 mb-4 ">
            Đã hiển thị toàn bộ phim.
          </p>
        )}
      </div>

      {/* THÊM MỚI: Render ShowtimesModal một cách có điều kiện */}
      {selectedMovie && (
        <ShowtimesModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          movieTitle={selectedMovie.title}
          // Tên rạp phim này có thể lấy từ API hoặc một state khác
          cinemaName="F-CINEMA"
          scheduleData={mockScheduleData}
          onSelectShowtime={handleFinalShowtimeSelect}
        />
      )}

    </UserLayout>
  );
}

export default HomePage;