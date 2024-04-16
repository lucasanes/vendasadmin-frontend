export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
};

export type AuthContextProps = {
  signIn: (user: User, token: string, rememberMe: boolean) => void;

  signOut: () => void;

  user: User | null | undefined;

  token: string | null | undefined;
};

export type DataProps = {
  user: User | null;

  token: string | null;
};
