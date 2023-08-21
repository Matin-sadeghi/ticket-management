export const switchRole = (role:string) => {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};
