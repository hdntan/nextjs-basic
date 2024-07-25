"use client";
import authApiRequest from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const LogoutPage = () => {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");

  const handleLogout = useCallback(async () => {
    await authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
      console.log("logged out");
      route.push(`/login?redirectFrom=${pathname}`);
    });
  }, [route, pathname]);

  useEffect(() => {
    if (sessionToken === clientSessionToken?.value) {
      handleLogout();
    }
  }, [sessionToken, handleLogout]);
  return <div>LogoutPage</div>;
};

export default LogoutPage;
