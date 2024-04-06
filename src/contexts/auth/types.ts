export type AuthContextProps = {
  signIn: (nome: string, email: string, token: string) => void;

  signOut: () => void;

  user:
    | {
        nome: string;
        email: string;
      }
    | null
    | undefined;

  token: string | null | undefined;
};

export type DataProps = {
  user: {
    nome: string;
    email: string;
  } | null;

  token: string | null;
};
