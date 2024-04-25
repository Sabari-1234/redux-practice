// console.log("hello redux");

const { createStore, combineReducers, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");

//action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
const buyCake = () => {
  return { type: BUY_CAKE, info: "i want to buy cake" };
};
const buyIcecream = () => {
  return { type: BUY_ICECREAM, info: "i want to buy icecream" };
};

//reducer

const initialCakeState = {
  numberOfCakes: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    default:
      return state;
  }
};
const initialIcecreamState = {
  numberOfIceCream: 20,
};
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case "BUY_ICECREAM":
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

//store
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() => {
  // console.log("updated state", store.getState());
});

store.dispatch(buyCake());

store.dispatch(buyCake());

store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

unsubscribe();
