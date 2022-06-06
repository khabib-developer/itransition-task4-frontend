import { FormAction, FormActionTypes } from "./types";

interface formState {
  name: string;
  email: string;
  password: string;
  error: any;
}

const initialState: formState = {
  name: "",
  email: "",
  password: "",
  error: {},
};

export const formReducer = (
  state = initialState,
  action: FormAction
): formState => {
  switch (action.type) {
    case FormActionTypes.FORM_NAME:
      return { ...state, name: action.payload };
    case FormActionTypes.FORM_EMAIL:
      return { ...state, email: action.payload };
    case FormActionTypes.FORM_PASSWORD:
      return { ...state, password: action.payload };
    case FormActionTypes.FORM_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
