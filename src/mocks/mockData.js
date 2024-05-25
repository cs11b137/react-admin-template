import { permissions } from "../utils/permissions";
const { faker } = require("@faker-js/faker");

const generateUsers = (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      id: faker.datatype.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      role: faker.helpers.randomize(["admin", "manager", "user"]),
    };
    users.push(user);
  }
  return users;
};

const generateRoles = () => [
  {
    id: faker.datatype.uuid(),
    name: "Admin",
    description: "Administrator",
    permissions: [
      permissions.VIEW_DASHBOARD,
      permissions.MANAGE_USERS,
      permissions.MANAGE_ROLES,
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: "Manager",
    description: "Manager",
    permissions: [permissions.VIEW_DASHBOARD],
  },
  {
    id: faker.datatype.uuid(),
    name: "User",
    description: "Regular User",
    permissions: [],
  },
];

const mockData = {
  users: generateUsers(50),
  roles: generateRoles(),
};

module.exports = mockData;
