'use client'

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export default function AuthProvider ({children}) {

  const [isLogged, setIsLogged] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => 
      cookie.trim().startsWith('sessionToken=')
    );
    if (sessionCookie) {
      setSession(sessionCookie.split("=")[1]);
      setIsLogged(true);
    }else{
      setSession(null);
      setIsLogged(false);
    }
  }, [isLogged]);

  return (
    <AuthContext.Provider value={{isLogged, setIsLogged, session}}>
        {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext);
