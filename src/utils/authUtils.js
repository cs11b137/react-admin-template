export const hasPermission = (user, permission) => {
  if (!user || !user.role || !user.role.permissions) {
    return false;
  }
  return user.role.permissions.includes(permission);
};
