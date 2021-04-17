import React, { useEffect, useReducer } from "react";
import { appState } from "./Context";
import Reducers from "./reducers";

const { UserReducer } = Reducers;

export const AppState = ({children}) => {
  const { Provider } = appState;

  // Alters app state on load
  useEffect(() => {}, []);
  const { initialUserState, stateReducer } = UserReducer;
  const [state, dispatch] = useReducer(stateReducer, initialUserState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};
