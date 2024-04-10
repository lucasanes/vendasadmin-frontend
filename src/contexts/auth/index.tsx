/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api.js";
import { AuthContextProps, DataProps, User } from "./types.js";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataProps>({} as DataProps);

  //TODO: Salvar token nos cookies ao invés do localStorage

  function signIn(user: User, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setData({
      user: user,
      token: token,
    });

    localStorage.setItem("@sigeve:token", token);
  }

  function signOut() {
    localStorage.removeItem("@sigeve:token");

    window.location.replace("/");

    setData({ user: null, token: null });
  }

  useEffect(() => {
    const token = localStorage.getItem("@sigeve:token");

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
