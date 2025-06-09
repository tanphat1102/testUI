// src/layouts/UserLayout.tsx

import React, { useState } from 'react';

// Import các component Header và Footer

// Import các kiểu dữ liệu và dữ liệu mẫu
import FCinema_Logo from '../../assets/FCinema_Logo.png';
import bgTop from '../../assets/bg-top.png';
import type { NavItemData } from './components/header/components/NavigationBar';
import type { FooterColumnData, SocialLink } from './components/footer/components/FooterColumns';
import type { User } from './components/header/components/UserAvatar';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// --- DỮ LIỆU MẪU (Trong ứng dụng thật, bạn có thể lấy từ API) ---

// Dữ liệu cho Header
const sampleNavItems: NavItemData[] = [
  {
    label: 'Phim',
    path: '/phim',
    children: [
      { label: 'Hành động', path: '/phim-le/hanh-dong' },
      { label: 'Kinh dị', path: '/phim-le/kinh-di' },
    ],
  },
  { label: 'Lịch chiếu', path: '/lich-chieu' },
];

const sampleUser: User = {
  name: 'Sơn Tùng',
  avatarUrl: 'https://i.pravatar.cc/150?u=sontung',
};

// Dữ liệu cho Footer
const sampleSocialLinks: SocialLink[] = [
  { href: '#', iconClass: 'fab fa-facebook-f' },
  { href: '#', iconClass: 'fab fa-twitter' },
  { href: '#', iconClass: 'fab fa-instagram' },
  { href: '#', iconClass: 'fab fa-youtube' },
];

const sampleFooterColumns: FooterColumnData[] = [
    { type: 'links', title: 'VỀ CHÚNG TÔI', links: [ { href: '#', label: 'Giới thiệu' }, { href: '#', label: 'Liên hệ' }, { href: '#', label: 'Tuyển dụng' } ] },
    { type: 'links', title: 'ĐIỀU KHOẢN', links: [ { href: '#', label: 'Điều khoản sử dụng' }, { href: '#', label: 'Chính sách bảo mật' }, { href: '#', label: 'Khiếu nại' } ] },
    { type: 'links', title: 'HỖ TRỢ', links: [ { href: '#', label: 'Góp ý' }, { href: '#', label: 'Câu hỏi thường gặp' }, { href: '#', label: 'Hướng dẫn sử dụng' } ] },
    { type: 'contact', title: 'KẾT NỐI VỚI FCINEMA', address: 'Đường Võ Nguyên Giáp, P. Phước Tân, TP. Biên Hòa, Đồng Nai', phone: '1900 1234', email: 'support@fcinema.vn' }
];

// --- COMPONENT LAYOUT ---

interface UserLayoutProps {
  children: React.ReactNode; // 'children' là nội dung của từng trang sẽ được đặt vào đây
}

const UserLayout = ({ children }: UserLayoutProps) => {
  // Quản lý trạng thái người dùng (đăng nhập/chưa đăng nhập)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = () => setCurrentUser(sampleUser);
  const handleLogout = () => setCurrentUser(null);
  const handleRegister = () => alert('Chuyển đến trang đăng ký!');

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Header được truyền đầy đủ props cần thiết.
        Layout sẽ quản lý trạng thái đăng nhập và truyền xuống Header.
      */}
      <Header
        logoSrc={FCinema_Logo}
        navItems={sampleNavItems}
        user={currentUser}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      <div className="h-10"></div>

      {/* Thêm `pt-20` (padding-top) để nội dung không bị Header che mất.
        Chiều cao của Header có thể khác nhau, bạn hãy điều chỉnh giá trị này cho phù hợp.
      */}
      <main className="bg-[url('./assets/pexels-pixabay-207142.jpg')] bg-repeat- flex-grow pt-20">{children}</main>

      {/* Footer không cần class `fixed` nữa.
        Layout flexbox sẽ tự động đẩy nó xuống dưới cùng.
      */}
      <Footer
        logoSrc={FCinema_Logo}
        bgSrc={bgTop}
        socialLinks={sampleSocialLinks}
        columns={sampleFooterColumns}
        copyrightText={`© ${new Date().getFullYear()} FCinema. All rights reserved.`}
      />
    </div>
  );
};

export default UserLayout;