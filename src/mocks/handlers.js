import { http } from "msw";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const roles = [
  { id: 1, name: "Admin", description: "Administrator" },
  { id: 2, name: "Manager", description: "Manager" },
];

export const handlers = [
  http.get("/api/users", (req, res, ctx) => {
    return res(ctx.json(users));
  }),
  http.post("/api/users", (req, res, ctx) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    return res(ctx.json(newUser));
  }),
  http.get("/api/roles", (req, res, ctx) => {
    return res(ctx.json(roles));
  }),
  http.post("/api/roles", (req, res, ctx) => {
    const newRole = req.body;
    newRole.id = roles.length + 1;
    roles.push(newRole);
    return res(ctx.json(newRole));
  }),
];
