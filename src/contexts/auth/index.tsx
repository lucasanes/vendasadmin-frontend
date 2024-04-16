/* eslint-disable react-refresh/only-export-components */
import Cookies from "js-cookies";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api.js";
import { AuthContextProps, DataProps, User } from "./types.js";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataProps>({} as DataProps);

  function signIn(user: User, token: string, rememberMe: boolean) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setData({
      user: user,
      token: token,
    });

    if (rememberMe) {
      Cookies.setItem("@sigeve:token", token);
    } else {
      sessionStorage.setItem("@sigeve:token", token);
    }
  }

  function signOut() {
    Cookies.removeItem("@sigeve:token");
    sessionStorage.removeItem("@sigeve:token");

    window.location.replace("/");

    setData({ user: null, token: null });
  }

  useEffect(() => {
    let token: string | null = null;

    if (Cookies.getItem("@sigeve:token")) {
      token = Cookies.getItem("@sigeve:token");
    } else {
      token = sessionStorage.getItem("@sigeve:token");
    }

    async function fetchData() {
      try {
        const response = await api.get(`/api/usuarios/validar/${token}`);

        if (response.data.token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setData({
            user: response.data.user,
            token: response.data.token,
          });
        } else {
          signOut();
        }
      } catch (e) {
        signOut();
      }
    }

    if (token) {
      fetchData();
    } else {
      setData({ user: null, token: null });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data?.user,
        token: data?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
