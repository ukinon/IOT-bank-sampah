import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to="/">Home</Link>,
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/app">Timbang</Link>,
    key: "/app",
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link to="/price-list"> Harga</Link>,
    key: "/price-list",
    icon: <UnorderedListOutlined />,
  },
  {
    label: <Link to="/member-list"> Member</Link>,
    key: "/member-list",
    icon: <UserOutlined />,
  },
  {
    label: <Link to="/transaction"> Transaksi </Link>,
    key: "/transaction",
    icon: <TransactionOutlined />,
  },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-row items-center justify-between w-screen px-8 py-3 md:px-12">
      <div className="flex flex-row items-center gap-2">
        <img src="/logo.png" className="h-8" />
        <h1 className="text-xl font-bold text-primary">
          Sampah<span className="text-black">Mu</span>
        </h1>
      </div>

      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="w-1/12 md:w-3/12 2xl:w-2/12"
      />
    </div>
  );
};

export default Navbar;
