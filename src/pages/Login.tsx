import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLogin } from "../hooks/auth";
import { useEffect } from "react";
import { axiosInstance } from "../lib/axios";

export default function Login() {
  const { loginMutation, loginPending, loginSuccess, loginData } = useLogin();

  useEffect(() => {
    if (loginSuccess && loginData?.data?.data?.access_token) {
      const token = loginData?.data.data.access_token;
      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      console.log("Token stored and header set:", token); // Debug: log token
      window.location.replace("/app"); // Redirect after setting the header
    }
  }, [loginSuccess, loginData]);

  const onFinish = (values: { email: string; password: string }) => {
    loginMutation(values);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-[80dvh] gap-12">
      <h1 className="text-3xl font-bold text-primary">
        Sampah<span className="text-black">Mu</span> Admin
      </h1>
      <Form
        name="normal_login"
        className="w-[30%] login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="self-end w-full login-form-button"
            disabled={loginPending}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
