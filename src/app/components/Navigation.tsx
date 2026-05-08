import { Link, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: "수업", path: "/app/courses" },
  { label: "수강자들", path: "/app/students" },
  { label: "팀", path: "/app/teams" },
];

export default function Navigation() {
  const location = useLocation();
  const { user, isProfessor, isStudent, setUserRole } = useAuth();

  const isActive = (path: string) => {
    if (path === "/app/teams") {
      return location.pathname.startsWith("/app/teams");
    }
    if (path === "/app/students") {
      return location.pathname.startsWith("/app/students") || location.pathname === "/app/profile";
    }
    return location.pathname === path;
  };

  return (
    <div className="bg-black w-full h-16 px-8 md:px-32 flex items-center justify-between shadow-lg border-b-3 border-[#3676ff]">
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          CampusConnect
        </h1>
      </Link>

      <div className="flex items-center gap-8">
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative transition-colors font-semibold ${
                isActive(item.path) ? "text-[#3676ff]" : "text-gray-400 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              {isActive(item.path) && (
                <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-[#3676ff]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* 개발용 역할 전환 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole("student")}
              className={`px-3 py-1 text-xs rounded ${
                isStudent
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              title="학생 모드로 전환"
            >
              학생
            </button>
            <button
              onClick={() => setUserRole("professor")}
              className={`px-3 py-1 text-xs rounded ${
                isProfessor
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              title="교수 모드로 전환"
            >
              교수
            </button>
          </div>

          <Link to="/app/mypage" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2f67df] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user?.name.charAt(0) || "U"}
              </span>
            </div>
            <div className="relative">
              <span
                className={`text-sm font-medium ${
                  location.pathname === "/app/mypage" ? "text-[#1862ff]" : "text-white"
                }`}
              >
                {user?.name || "사용자"}
              </span>
              {location.pathname === "/app/mypage" && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1862ff]" />
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}