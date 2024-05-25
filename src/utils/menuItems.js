import { permissions } from "./permissions";

export const menuItems = [
  {
    key: "dashboard",
    label: "仪表盘",
    path: "/",
    permission: permissions.VIEW_DASHBOARD,
  },
  {
    key: "users",
    label: "用户管理",
    path: "/users",
    permission: permissions.MANAGE_USERS,
  },
  {
    key: "roles",
    label: "角色管理",
    path: "/roles",
    permission: permissions.MANAGE_ROLES,
  },
];
