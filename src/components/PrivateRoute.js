import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  const user = true;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // 如果未登录,重定向到登录页面
          return <Redirect to="/login" />;
        }

        if (roles && !roles.includes(user.role)) {
          // 如果用户角色不满足要求,重定向到无权限页面
          return <Redirect to="/unauthorized" />;
        }

        // 渲染组件
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
