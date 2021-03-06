import { useCallback } from "react";
import { Logout } from "../auth";
import { useActions } from "../redux/useActions";
import { useTypedSelector } from "../redux/useSelectedTypes";

export const useHttp = () => {
  const logout = Logout()
  const { server } = useTypedSelector((s) => s.app);
  const { setLoading, setError } = useActions();
  return useCallback(
    async (url: any, method = "GET", body: any = null, headers: any = {}) => {
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        headers["authorization"] = `Bearer ${localStorage.getItem("task4")}`;
        setLoading(true);
        let response = await fetch(`${server}${url}`, {
          method,
          body,
          headers,
        });
        const data = await response!.json();
        if (!response!.ok) {
          if(response!.status === 403 || response!.status === 401) {
            logout()
          }
          throw new Error(data.message || "Something went wrong");
        }
        setLoading(false);
        return data;
      } catch (e: any) {
        console.log(e.message);
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [logout, server, setError, setLoading]
  );
};
