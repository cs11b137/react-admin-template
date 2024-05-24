const express = require("express");
const app = express();
const data = require("./db.json");

app.use(express.json());

// 模拟 GET /api/users
app.get("/api/users", (req, res) => {
  res.json(data.users);
});

// 模拟 GET /api/roles
app.get("/api/roles", (req, res) => {
  res.json(data.roles);
});

// 启动服务器
app.listen(3001, () => {
  console.log("Mock server is running on http://localhost:3001");
});
