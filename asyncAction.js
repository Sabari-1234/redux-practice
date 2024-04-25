//initial state

const { createStore } = require("redux");

const initialState = {
  loding: false,
  users: [],
  error: "",
};

//action
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};
const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
};
const fetchUserFailure = (err) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: err,
  };
};

//reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loding: false,
        users: action.payload,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//store

const store = createStore(reducer);
