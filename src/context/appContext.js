import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/appReducer";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  users: []
}

const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)
}