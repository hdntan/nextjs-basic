"use client";
import authApiRequest from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import React, { useEffect } from "react";
import { differenceInHours } from "date-fns";

const SlideSession = () => {
  const handleSlideSession = async () => {
    const res = await authApiRequest.slideSessionFromClientToServer();
    clientSessionToken.expiresAt = res.payload.data.expiresAt;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiresAt = new Date(clientSessionToken.expiresAt);
      if (differenceInHours(expiresAt, now) < 1) {
        handleSlideSession();
      }
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SlideSession;
