export const isAuthenticated = () => {
  const token = localStorage.getItem('vaultToken');
  return !!token;
};

export const getUser = () => {
  const user = localStorage.getItem('vaultUser');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('vaultToken');
  localStorage.removeItem('vaultUser');
};
