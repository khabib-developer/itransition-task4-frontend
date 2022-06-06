/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useHttp } from "../hooks/http";
import { useActions } from "../hooks/redux/useActions";
import { useTypedSelector } from "../hooks/redux/useSelectedTypes";
import { IUser } from "../interfaces";
import { SignIn } from "../pages/auth/sign-in";
import { SignUp } from "../pages/auth/sign-up";
import { Main } from "../pages/main";

export const Pages: React.FC = () => {
  const [permission, setpermission] = useState<boolean>(false);
  const { token, user } = useTypedSelector((s: any) => s.app);

  const actions = useActions();

  const http = useHttp();

  const location = useLocation();

  useEffect(() => {
    (async function () {
      if (token) {
        const user: IUser = await http("/user/check");
        if (user) {
          actions.setUser(user);
          const users = await http("/user/get")
          actions.setUsers(users);
        }
      }
      setpermission(true);
    })();
  }, [location]);

  if (permission) {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        {token && user && token !== "null" ? null : (
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </>
        )}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  return (
    <div
      className="d-flex justify-content-center w-100 align-items-center text-muted"
      style={{ height: "100vh" }}
    >
      loading...
    </div>
  );
};
