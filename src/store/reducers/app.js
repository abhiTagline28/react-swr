import { USER_LIST, EDIT_USER } from "../constants";

const initialState = {
  user_list: [],
  edit_user: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LIST:
      return {
        ...state,
        user_list: payload,
      };
    case EDIT_USER:
      return {
        ...state,
        edit_user: payload,
      };

    default:
      return state;
  }
};
