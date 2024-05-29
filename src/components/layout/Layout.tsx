import { Suspense, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import PageSkeleton from "../loader/Skeleton";
import { useResetRecoilState } from "recoil";
import { formValue } from "../../atoms/formValue";
import { Footer } from "antd/es/layout/layout";

export default function Layout() {
  const location = useLocation();
  const resetForm = useResetRecoilState(formValue);
  useEffect(() => {
    resetForm();
  }, [location.pathname]);
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

      <Footer style={{ textAlign: "center", background: "transparent" }}>
        SampahMu ©{new Date().getFullYear()}
      </Footer>
    </div>
  );
}
