import React from 'react'
import { createContext, useState } from "react";
import { AuthPayload } from "../api/authApi";

export interface RegisterContextType {
  payload?: AuthPayload;
  setPayload: React.Dispatch<React.SetStateAction<AuthPayload>>;
}

export const RegisterContext = createContext<RegisterContextType | null>(null);

export default function RegisterProvider({
  children
}: React.PropsWithChildren<unknown>) {
  const [payload, setPayload] = useState<AuthPayload>({
    phoneNumber: "",
    code: ""
  });

  console.log("payload", payload);

  return (
    <RegisterContext.Provider value={{ payload, setPayload }}>
      {children}
    </RegisterContext.Provider>
  );
}
