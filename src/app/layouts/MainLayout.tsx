import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

function CourseSideNavigation() {
  const location = useLocation();
  const courseMatch = location.pathname.match(/^\/app\/courses\/([^/]+)/);
  const courseId = courseMatch?.[1];
  const sideNavItems = [
    {
      label: "수강자들",
      path: courseId ? `/app/courses/${courseId}/students` : "/app/students",
      legacyPath: "/app/students",
    },
    {
      label: "팀",
      path: courseId ? `/app/courses/${courseId}/teams` : "/app/teams",
      legacyPath: "/app/teams",
    },
  ];

  const isActive = (item: (typeof sideNavItems)[number]) => {
    if (item.legacyPath === "/app/students") {
      return location.pathname.startsWith(item.path) || location.pathname.startsWith("/app/students");
    }

    if (item.legacyPath === "/app/teams") {
      return location.pathname.startsWith(item.path) || location.pathname.startsWith("/app/teams");
    }

    return location.pathname === item.path;
  };

  return (
    <aside className="w-full lg:w-[220px] lg:shrink-0">
      <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-sm backdrop-blur lg:sticky lg:top-24 lg:p-4">
        <p className="mb-3 px-1 text-sm font-black text-gray-500">수업 메뉴</p>
        <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {sideNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                isActive(item)
                  ? "bg-[#155dfc] text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-[#eff6ff] hover:text-[#155dfc]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default function MainLayout() {
  const location = useLocation();
  const showCourseSideNavigation =
    /^\/app\/courses\/[^/]+/.test(location.pathname) ||
    location.pathname.startsWith("/app/students") ||
    location.pathname.startsWith("/app/teams");

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <main className="flex-1 w-full">
        {showCourseSideNavigation ? (
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:gap-6 sm:py-6 lg:flex-row lg:px-8">
            <CourseSideNavigation />
            <div className="min-w-0 flex-1">
              <Outlet />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}
