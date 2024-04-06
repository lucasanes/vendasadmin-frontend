/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api.js";
import { AuthContextProps, DataProps } from "./types.js";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataProps>({} as DataProps);

  function signIn(nome: string, email: string, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setData({
      user: { nome, email },
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
        const response = await api.get(`/user/token/${token}`);

        const dadosUser = {
          nome: response.data.user.nome,
          email: response.data.user.email,
        };

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setData({
          user: dadosUser,
          token: response.data.token,
        });
      } catch {
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

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthProvider, useAuth };
