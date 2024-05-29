import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  TransactionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { axiosInstance } from "../../lib/axios";

type MenuItem = Required<MenuProps>["items"][number];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const isAuthenticated = useIsAuthenticated();

  const logout = async () => {
    const response = await axiosInstance.post("/logout");

    if (response.status === 200) {
      message.success("Berhasil logout");
      localStorage.removeItem("token");
      window.location.replace("/");
    } else {
      message.error("Gagal logout");
    }
  };

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
      label: <Link to="/trash-list"> Sampah</Link>,
      key: "/trash-list",
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
    {
      label: (
        <Link onClick={logout} to="/">
          {" "}
          Keluar{" "}
        </Link>
      ),
      key: "/logout",
      icon: <LogoutOutlined />,
    },
  ];

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-row items-center justify-between w-screen px-8 py-3 md:px-12">
      <Link to="/" className="flex flex-row items-center gap-2">
        <img src="/logo.png" className="h-8" />
        <h1 className="text-xl font-bold text-primary">
          Sampah<span className="text-black">Mu</span>
        </h1>
      </Link>

      {isAuthenticated && (
        <Menu
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className="w-1/12 md:w-3/12 2xl:w-2/12"
        />
      )}
    </div>
  );
};

export default Navbar;
