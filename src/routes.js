import { Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import RolesPage from "./pages/Roles";
import UnauthorizedPage from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";

const routes = [
  {
    path: "/login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/",
    component: DashboardPage,
    roles: ["admin", "manager"],
    exact: true,
  },
  {
    path: "/users",
    component: UsersPage,
    roles: ["admin"],
  },
  {
    path: "/roles",
    component: RolesPage,
    roles: ["admin"],
  },
  {
    path: "/unauthorized",
    component: UnauthorizedPage,
  },
];

const authRoutes = routes.map((route) => {
  if (route.roles) {
    return <PrivateRoute key={route.path} {...route} />;
  }
  return <Route key={route.path} {...route} />;
});

export default authRoutes;
