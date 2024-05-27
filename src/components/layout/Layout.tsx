import { Suspense } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import PageSkeleton from "../loader/Skeleton";

export default function Layout() {
  return (
    <div className="flex flex-col items-center w-full h-full overflow-x-hidden bg-white">
      <div className="flex items-center w-[95%]">
        <Navbar />
      </div>
      <div className="flex justify-center w-full min-h-0 overflow-x-hidden bg-white md:p-4 md:mb-0">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
