import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    const user = true;

    if (!user) {
      // 如果未登录并且当前路由不是登录页面,则重定向到登录页面
      if (location.pathname !== "/login") {
        history.push("/login");
      }
    } else {
      // 如果已登录并且当前路由是登录页面,则重定向到默认页面
      if (location.pathname === "/login") {
        history.push("/");
      }
    }
  }, [history, location.pathname]);

  return children;
};

export default RouteGuard;
