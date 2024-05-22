import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Sider } = Layout;

const headerMenuItems = [
  {
    key: "1",
    label: <Link to="/">主页</Link>,
  },
  {
    key: "2",
    label: <Link to="/users">用户管理</Link>,
  },
  {
    key: "3",
    label: <Link to="/roles">角色管理</Link>,
  },
];

const siderMenuItems = [
  {
    key: "sub1",
    label: "Navigation One",
    children: [
      { key: "1", label: "Option 1" },
      { key: "2", label: "Option 2" },
      { key: "3", label: "Option 3" },
      { key: "4", label: "Option 4" },
    ],
  },
];

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={headerMenuItems}
        />
      </Header>
      <Layout className="site-layout" style={{ marginTop: 64 }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={siderMenuItems}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
