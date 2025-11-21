"use client";

import MainLoader from "@/components/Loaders/MainLoader";
import { setUser } from "@/redux/features/auth/auth-slice";
import { useAppDispatch } from "@/redux/hooks";
import { useGetMyUserQuery } from "@/redux/services/user/user-api";
import { useEffect } from "react";

const AuthUserWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const { data: userData, isLoading: isUserLoading } = useGetMyUserQuery();

  useEffect(() => {
    if (userData?.data) {
      dispatch(setUser(userData.data));
    }
  }, [dispatch, userData]);

  if (isUserLoading) {
    return <MainLoader />;
  }

  return <>{children}</>;
};

export default AuthUserWrapper;
