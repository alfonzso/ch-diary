const inMemoryJWTManager = () => {
  let inMemoryJWT: string | null = null;

  const getToken = () => inMemoryJWT;

  const setToken = (accessToken: string) => {
    inMemoryJWT = accessToken;
    return true;
  };

  const ereaseToken = () => {
    inMemoryJWT = null;
    return true;
  }

  return {
    ereaseToken,
    getToken,
    setToken,
  }
};

export default inMemoryJWTManager()