import { IUser } from "../../interfaces";

export enum AppActionTypes {
  APP_TOKEN = "APP_TOKEN",
  APP_USER = "APP_USER",
  APP_LOADING = "APP_LOADING",
  APP_ERROR = "APP_ERROR",
  APP_SUCCESS = "APP_SUCCESS",
  APP_USERS = "APP_USERS",
}

export interface AppTokenAction {
  type: AppActionTypes.APP_TOKEN;
  payload: string;
}

export interface AppUserAction {
  type: AppActionTypes.APP_USER;
  payload: IUser;
}

export interface AppUsersAction {
  type: AppActionTypes.APP_USERS;
  payload: IUser[];
}

export interface AppLoadingAction {
  type: AppActionTypes.APP_LOADING;
  payload: boolean;
}

export interface AppErrorAction {
  type: AppActionTypes.APP_ERROR;
  payload: string | null;
}

export interface AppSuccessAction {
  type: AppActionTypes.APP_SUCCESS;
  payload: string | null;
}

export type AppAction =
  | AppTokenAction
  | AppUserAction
  | AppLoadingAction
  | AppErrorAction
  | AppSuccessAction
  | AppUsersAction;
