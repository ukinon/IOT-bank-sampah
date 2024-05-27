import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Timbang from "./pages/Timbang/Timbang";
import PriceList from "./pages/PriceList";
import MemberList from "./pages/MemberList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/app" element={<Timbang />} />
          <Route path="/price-list" element={<PriceList />} />
          <Route path="/member-list" element={<MemberList />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
