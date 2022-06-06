// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IUser } from "../../interfaces";
import { AppActionTypes } from "./types";

export const setToken = (payload: string | null) => {
  payload
    ? localStorage.setItem("task4", payload)
    : localStorage.removeItem("task4");
  return {
    type: AppActionTypes.APP_TOKEN,
    payload,
  };
};

export const setUser = (payload: IUser | null) => {
  return {
    type: AppActionTypes.APP_USER,
    payload,
  };
};

export const setUsers = (payload: IUser[]) => {
  return {
    type: AppActionTypes.APP_USERS,
    payload,
  };
};

export const setLoading = (payload: boolean) => {
  return {
    type: AppActionTypes.APP_LOADING,
    payload,
  };
};

export const setError = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_ERROR,
    payload,
  };
};

export const setSuccess = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_SUCCESS,
    payload,
  };
};
