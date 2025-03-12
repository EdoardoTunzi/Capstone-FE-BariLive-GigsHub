const initialState = {
  user: null,
  token: null
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_USER":
      return {
        ...state,
        user: action.payload //Salvo i dati dell'utente
      };
    case "ADD_TO_TOKEN":
      return {
        ...state,
        token: action.payload //Salvo il token dell'utente
      };
    case "LOGOUT":
      return {
        ...state,
        user: null, // Resetto lo stato quando l'utente esce
        token: null
      };

    default:
      return state;
  }
};

export default mainReducer;
