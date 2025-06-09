// // src/components/Header/Header.tsx
import React from "react";
import "./Header.scss"; // File SCSS vẫn giữ nguyên cho các style tùy chỉnh
import NavigationBar, { type NavItemData } from "./components/NavigationBar";
import AuthSection from "./components/AuthSection";
import type { User } from "./components/UserAvatar";

// Props của Header bây giờ rất linh động
interface HeaderProps {
  logoSrc: string;
  navItems: NavItemData[];
  user: User | null;

  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  logoSrc,
  navItems,
  user,
  onLogin,
  onRegister,
  onLogout,
}) => {
  return (
    <header className="bg-[url('./assets/bg-top.png')] bg-repeat-x fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 text-white">
        {/* Logo */}
        <div className="text-2xl font-bold text-red-500">
          <a href="/">
            <img className="w-22" src={logoSrc} alt="FCinema Logo" />
          </a>
        </div>

        {/* Navigation */}
        <NavigationBar items={navItems} />

        {/* Auth Section */}
        <AuthSection
          user={user}
          onLogin={onLogin}
          onRegister={onRegister}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
};

export default Header;
