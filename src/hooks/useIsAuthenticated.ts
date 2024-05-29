export const useIsAuthenticated = () => {
  const authenticated = localStorage.getItem("token");

  if (!authenticated) {
    return false;
  }
  return true;
};
