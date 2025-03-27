export const ADD_TO_USER = "ADD_TO_USER";
export const LOGOUT = "LOGOUT";
export const ADD_TO_TOKEN = "ADD_TO_TOKEN";

export const addToUser = (userData) => {
  return {
    type: ADD_TO_USER,
    payload: userData
  };
};

export const addToToken = (token) => {
  return {
    type: ADD_TO_TOKEN,
    payload: token
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
