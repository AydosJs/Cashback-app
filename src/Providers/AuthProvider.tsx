import React, { createContext, useState } from "react";
import { AuthPayload } from "../api/authApi";
import * as authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie"

type Props = {
  children: React.ReactNode;
};

export type TokenResponse = {
  token?: string;
  name?: string;
};

export interface AuthContextType {
  isLoggedIn?: boolean;
  register: (payload: AuthPayload) => Promise<unknown>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<TokenResponse | undefined>({ token: Cookies.get("token") || "" });
  const [isLoggedIn, setLoggedIn] = useState<boolean>(Boolean(token?.token));
  const navigate = useNavigate();

  const setAsLoggedIn = (resp: TokenResponse) => {
    if (resp?.token) {
      setToken(resp);
      setLoggedIn(true);
      Cookies.set("token", resp.token);
      Cookies.set("fullName", resp?.name!);
      toast.success("Successfull !");

      navigate("/companies");
    }
    return resp;
  };

  // console.log("token", token);

  const register = (payload: AuthPayload) => {
    return authApi
      .register(payload)
      .then((value) => setAsLoggedIn(value.data))
      .catch((error) => toast.error("Code is not correct"));
    // return authApi
    //   .register(payload)
    //   .then((value) => console.log("register value", value));
  };

  const value = { isLoggedIn, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
