import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Timbang from "./pages/Timbang/Timbang";
import MemberList from "./pages/MemberList";
import TransactionPage from "./pages/Transaction";
import Login from "./pages/Login";
import TrashList from "./pages/TrashList";
import { useIsAuthenticated } from "./hooks/useIsAuthenticated";

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {isAuthenticated && (
            <>
              <Route path="/app" element={<Timbang />} />
              <Route path="/trash-list" element={<TrashList />} />
              <Route path="/member-list" element={<MemberList />} />
              <Route path="/transaction" element={<TransactionPage />} />
            </>
          )}

          <Route path="/admin" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
