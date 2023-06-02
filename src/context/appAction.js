import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../reducer/appConstant";
import {
    ALL_EVENT_FAIL,
    ALL_EVENT_REQUEST,
    ALL_EVENT_SUCCESS,
    ADMIN_EVENT_REQUEST,
    ADMIN_EVENT_SUCCESS,
    ADMIN_EVENT_FAIL,
    NEW_EVENT_REQUEST,
    NEW_EVENT_SUCCESS,
    NEW_EVENT_FAIL,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_FAIL,
    EVENT_DETAILS_SUCCESS
} from "../reducer/appConstant";

import axios from "axios";
import setAuthToken, { APP_API } from "../utils/auth";
import Notify from "../utils/toast";

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.post(
            `${APP_API}/api/AppUser/Login`,
            { email, password },
            config
        ).then(response => {
            //get token from response
            const token = response.data.token;
            //set JWT token to local
            localStorage.setItem("token", token);
            sessionStorage.setItem("user_id", response.data.user.id);
            //set token to axios common header
            setAuthToken(token);
            dispatch({ type: LOGIN_SUCCESS, payload: response.data.user, isAdmin: (response.data.user.role === "Admin") });
            return true;
        })
    } catch (error) {
        if (error.response.status && error.response.status === 401)
            dispatch({ type: LOGIN_FAIL, payload: `User not exist!` });
        else
            dispatch({ type: LOGIN_FAIL, payload: `Something went wrong` });
        return false;
    }
};

// Register
export const register = (user, isAppUser) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        const { data } = await axios.post(`${APP_API}/api/${isAppUser?'App':''}User/Add`, user, config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });

        Notify({
          message: `${data.firstname} ${data.surname} is registred successfully.`,
          type: "success"
        });
        return data;
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('token');
        setAuthToken();
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        const { data } = await axios.get(`${APP_API}/api/v1/admin/users`, config);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

// get  User Details
export const getUserDetails = (id, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        const { data } = await axios.get(`${APP_API}/api/${isAdmin?'App':''}User/${id}`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        const { data } = await axios.put(
            `${APP_API}/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const { data } = await axios.delete(`${APP_API}/api/v1/admin/user/${id}`, config);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};




/************************  Event ******************************/

// Get All Events
export const getEvents =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_EVENT_REQUEST });

      let link = `${APP_API}/api/Event/All?keyword=${keyword}&page=${currentPage}`;

      const { data } = await axios.get(link);
      dispatch({
        type: ALL_EVENT_SUCCESS,
        payload: {events:data},
      });
    } catch (error) {
      dispatch({
        type: ALL_EVENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Events For Admin
export const getAdminEvent = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EVENT_REQUEST });

    const { data } = await axios.get("/api/v1/Event/all");

    dispatch({
      type: ADMIN_EVENT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Event
export const createEvent = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/Event/Add`,
      productData,
      config
    );

    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Event
export const updateEvent = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/Event/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });

    const { data } = await axios.delete(`/api/Event/${id}`);

    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Events Details
export const getEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/Event/${id}`);

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
