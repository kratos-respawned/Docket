"use client";
import "@/app/_supressLogs";
import React from "react";
export const LogSupressor = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
