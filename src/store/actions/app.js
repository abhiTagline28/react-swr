import { EDIT_USER, USER_LIST } from "../constants";

export const userListAction = (params) => (dispatch) => {
  dispatch({
    type: USER_LIST,
    payload: params,
  });
};

export const editUserAction = (params) => (dispatch) => {
  dispatch({
    type: EDIT_USER,
    payload: params,
  });
};
