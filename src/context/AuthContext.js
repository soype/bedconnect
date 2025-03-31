'use client'

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export default function AuthProvider ({children}) {

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const session = document.cookie
      .split(";")
      .map((cookie) => cookie.trim()) // Trim spaces from each cookie
      .find((cookie) => cookie.startsWith("sessionToken="));
    if (session) {
      setIsLogged(true);
    }
  }, [isLogged]);

  return (
    <AuthContext.Provider value={{isLogged, setIsLogged}}>
        {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext);
