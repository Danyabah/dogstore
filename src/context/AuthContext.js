import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    //TODO fetch запрос авторизации текущего пользователя
  }, []);

  return (
    // {{children}}
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
