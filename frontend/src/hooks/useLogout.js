import { useAuthContext } from "./useAuthContext";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
export const useLogout = () => {
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const { dispatch } = useAuthContext();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // update auth context by dispatching logout action
    dispatch({ type: "LOGOUT" });

    // clear state
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
