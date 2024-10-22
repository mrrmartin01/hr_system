"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";

export default function SessionSync() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(setUser(session.user));
    } else {
      dispatch(setUser(null));
    }
  }, [session, dispatch]);

  return null;
}