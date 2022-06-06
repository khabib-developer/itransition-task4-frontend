import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { useHttp } from "../http";
import { useActions } from "../redux/useActions";
import { useTypedSelector } from "../redux/useSelectedTypes";

export const Logout = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useActions();
  return useCallback(() => {
    setToken(null);
    setUser(null);
    navigate("/");
  }, [navigate, setToken, setUser]);
};

export const useAuth = () => {
  const http = useHttp();
  const form = useTypedSelector((s) => s.form);
  const { setToken, setUser, setFormError } = useActions();
  const navigate = useNavigate();
  return useCallback(
    async (url: string) => {
      console.log(url)
      if (validator.isEmpty(form.name) && url === "register")
        return setFormError({ name: true }, "Wrong name");
      if (!validator.isEmail(form.email))
        return setFormError({ email: true, name: false }, "Wrong email");
      if (validator.isEmpty(form.password))
        return setFormError(
          { name: false, email: false, password: true },
          "Wrong password"
        );
      const res = await http(`/user/${url}`, "POST", form);
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setTimeout(() => navigate("/profile"), 500);
      }
    },
    [form, http, navigate, setFormError, setToken, setUser]
  );
};
