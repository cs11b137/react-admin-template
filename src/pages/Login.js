import React from "react";
import { Form, Input, Button } from "antd";
import { loginApi } from "../services/api";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledForm = styled(Form)`
  max-width: 400px;
  width: 100%;
`;

// 在任何样式化组件中使用主题变量
// const StyledButton = styled.button`
//   background-color: ${(props) => props.theme.colors.primary};
//   color: ${(props) => props.theme.colors.background};
//   font-size: ${(props) => props.theme.fontSizes.medium};
//   /* 其他样式... */
// `;

const LoginPage = () => {
  const onFinish = async (values) => {
    try {
      const response = await loginApi(values);
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      // 登录成功后的重定向或其他操作
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <LoginContainer>
      <StyledForm
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </StyledForm>
    </LoginContainer>
  );
};

export default LoginPage;
