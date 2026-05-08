import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
