import { Link, useLocation } from "wouter";
import { User, MapPin, Settings, Home } from "lucide-react";

interface MobileNavigationProps {
  currentPage: "home" | "profile" | "address" | "settings";
}

export default function MobileNavigation({ currentPage }: MobileNavigationProps) {
  const [location] = useLocation();

  const navItems = [
    { id: "home", path: "/", icon: Home, label: "Home" },
    { id: "profile", path: "/profile", icon: User, label: "Profile" },
    { id: "address", path: "/address", icon: MapPin, label: "Address" },
    { id: "settings", path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-mobile bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Link key={item.id} href={item.path}>
              <button
                className={`flex flex-col items-center p-2 ${
                  isActive ? "nav-btn-active" : "nav-btn-inactive"
                }`}
                data-testid={`nav-${item.id}`}
              >
                <Icon className="text-xl mb-1 h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
