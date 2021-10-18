import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../types/user";

export type AuthContextType = {
  authState: User;
  setAuthState: Dispatch<SetStateAction<User>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
