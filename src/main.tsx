import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider, Space } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00ABA7",
          borderRadius: 10,
          colorBgContainer: "#ffffff",
          colorPrimaryActive: "#00ABA7",
          colorPrimaryHover: "#00ABA7",
          colorPrimaryBgHover: "#00ABA7",
        },
      }}
    >
      <Space>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </QueryClientProvider>
      </Space>
    </ConfigProvider>
  </React.StrictMode>
);
