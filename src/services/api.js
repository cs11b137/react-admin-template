import axios from "axios";

const baseURL = "http://localhost:3000/api"; // 替换为你的后端API地址

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsersApi = () => api.get("/users");
export const createUserApi = (user) => api.post("/users", user);
export const updateUserApi = (userId, user) =>
  api.put(`/users/${userId}`, user);
export const deleteUserApi = (userId) => api.delete(`/users/${userId}`);

export const getRolesApi = () => api.get("/roles");
export const createRoleApi = (role) => api.post("/roles", role);
export const updateRoleApi = (roleId, role) =>
  api.put(`/roles/${roleId}`, role);
export const deleteRoleApi = (roleId) => api.delete(`/roles/${roleId}`);

export const loginApi = (credentials) => api.post("/login", credentials);
