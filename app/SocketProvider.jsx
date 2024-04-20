"use client";
import { useEffect } from "react";
import socket from "@/libs/socket";

export default function SocketProvider() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.on("connect", () => {
        console.log("connected to soket");
      });
    }
  }, []);
  return null;
}
