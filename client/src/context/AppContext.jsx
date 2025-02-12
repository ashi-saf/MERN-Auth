import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = 'https://mern-auth-backend-wt92.onrender.com';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ctxValue = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AppContext.Provider value={ctxValue}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
