import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsersReducer, eventDetailsReducer, eventReducer, eventsReducer, newEventReducer, userDetailsReducer, userReducer } from "./reducer/appReducer";

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  events: eventsReducer,
  eventDetails: eventDetailsReducer,
  event: eventReducer,
  newEvent: newEventReducer,
});

let initialState = {
  user: {
    isAuthenticated: false,
  }
};
  
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
  
export default store;