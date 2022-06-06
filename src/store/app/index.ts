import { IUser } from "../../interfaces";
import { AppAction, AppActionTypes } from "./types";

interface appState {
  server: string;
  token: string | null;
  user: IUser | null;
  users: IUser[];
  loading: boolean;
  success: string | null;
  error: string | null;
}

const initialState: appState = {
  server: "http://localhost:4000",
  token: localStorage.getItem("task4"),
  user: null,
  users: [],
  loading: false,
  success: null,
  error: null,
};

export const appReducer = (
  state = initialState,
  action: AppAction
): appState => {
  switch (action.type) {
    case AppActionTypes.APP_TOKEN:
      return { ...state, token: action.payload };
    case AppActionTypes.APP_USER:
      return { ...state, user: action.payload };
    case AppActionTypes.APP_USERS:
      return { ...state, users: action.payload };
    case AppActionTypes.APP_LOADING:
      return { ...state, loading: action.payload };
    case AppActionTypes.APP_SUCCESS:
      return { ...state, success: action.payload };
    case AppActionTypes.APP_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
