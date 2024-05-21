import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import RolesPage from "./pages/Roles";

const routes = [
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/",
    component: DashboardPage,
  },
  {
    path: "/users",
    component: UsersPage,
  },
  {
    path: "/roles",
    component: RolesPage,
  },
];

export default routes;
