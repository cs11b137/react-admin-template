import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { menuItems } from "../utils/menuItems";
import { hasPermission } from "../utils/authUtils";
import { useSelector } from "react-redux";

const { Header, Content, Sider } = Layout;

// const headerMenuItems = [
//   {
//     key: "1",
//     label: <Link to="/">主页</Link>,
//   },
//   {
//     key: "2",
//     label: <Link to="/users">用户管理</Link>,
//   },
//   {
//     key: "3",
//     label: <Link to="/roles">角色管理</Link>,
//   },
// ];

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
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const renderMenu = (items) => {
    return items.map((item) => {
      if (hasPermission(user, item.permission)) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      }
      return null;
    });
  };

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
        >
          {renderMenu(menuItems)}
        </Menu>
      </Header>
      <Layout className="site-layout" style={{ marginTop: 64 }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
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
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
