"use client";
import { clientSessionToken } from "@/lib/http";
import { createContext, ReactNode, useContext, useState } from "react";

// const AppContext = createContext({
//     sessionToken:'',
//     setSessionToken: (sessionStorage:string) => {}
// });

// export const useAppContext = () => {
//     const context = useContext(AppContext);
//     if(!context) {
//         throw new Error("useAppContext must be used within an AppProvider");
//     }

//     return context;
// }

const AppProvider = ({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) => {
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });
  return <>{children}</>;
};

export default AppProvider;
