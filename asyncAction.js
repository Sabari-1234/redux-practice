//initial state

const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { thunk } = require("redux-thunk");

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

//funnction instead of object  by redux thunk in create store to perform async operations

const fetchUser = () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());

    //then catch(promise )
    // axios
    //   .get("https://662a055367df268010a24f31.mockapi.io/users")
    //   .then((response) => {
    //     dispatch(fetchUserSuccess(response.data.map((user) => user.id)));
    //   })
    //   .catch((err) => dispatch(fetchUserFailure(err.message)));

    //try catch

    try {
      const response = await axios.get(
        "https://662a055367df268010a24f31.mockapi.io/users"
      );
      dispatch(fetchUserSuccess(response.data.map((user) => user.id)));
    } catch (err) {
      dispatch(fetchUserFailure(err.message));
    }
  };
};

//store

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUser());
