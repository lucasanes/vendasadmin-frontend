/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api } from "../../services/api.js";
import { AuthContextProps, DataProps, User } from "./types.js";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataProps>({} as DataProps);

  const [cookies, setCookie, removeCookie] = useCookies(["@sigeve:token"]);

  function signIn(user: User, token: string, rememberMe: boolean) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setData({
      user: user,
      token: token,
    });

    if (rememberMe) {
      setCookie("@sigeve:token", token, { path: "/" });
    } else {
      sessionStorage.setItem("@sigeve:token", token);
    }
  }

  function signOut() {
    removeCookie("@sigeve:token");
    sessionStorage.removeItem("@sigeve:token");

    window.location.replace("/");

    setData({ user: null, token: null });
  }

  useEffect(() => {
    let token: string | null = null;

    if (cookies["@sigeve:token"]) {
      token = cookies["@sigeve:token"];
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
