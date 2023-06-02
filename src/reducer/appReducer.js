import {
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,

    ALL_EVENT_REQUEST,
    ADMIN_EVENT_REQUEST,
    ALL_EVENT_SUCCESS,
    ADMIN_EVENT_SUCCESS,
    ALL_EVENT_FAIL,
    ADMIN_EVENT_FAIL,
    NEW_EVENT_REQUEST,
    NEW_EVENT_SUCCESS,
    NEW_EVENT_FAIL,
    NEW_EVENT_RESET,
    DELETE_EVENT_REQUEST,
    UPDATE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    UPDATE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
    UPDATE_EVENT_FAIL,
    DELETE_EVENT_RESET,
    UPDATE_EVENT_RESET,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,
    
    CLEAR_ERRORS,
} from "./appConstant";


export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;

    }
};

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const userDetailsReducer = (state = { userDetails: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.payload,
            };

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const eventsReducer = (state = { events: [] }, action) => {

    switch (action.type) {
        case ALL_EVENT_REQUEST:
        case ADMIN_EVENT_REQUEST:
            return {
                loading: true,
                events: [],
            };
        case ALL_EVENT_SUCCESS:
            return {
                loading: false,
                events: action.payload.events,
                eventsCount: action.payload.eventsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredEventsCount: action.payload.filteredEventsCount,
            };

        case ADMIN_EVENT_SUCCESS:
            return {
                loading: false,
                events: action.payload,
            };
        case ALL_EVENT_FAIL:
        case ADMIN_EVENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newEventReducer = (state = { event: {} }, action) => {
    switch (action.type) {
        case NEW_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_EVENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                event: action.payload.event,
            };
        case NEW_EVENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_EVENT_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const eventReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_EVENT_REQUEST:
        case UPDATE_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_EVENT_FAIL:
        case UPDATE_EVENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_EVENT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_EVENT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const eventDetailsReducer = (state = { event: {} }, action) => {
    switch (action.type) {
        case EVENT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case EVENT_DETAILS_SUCCESS:
            return {
                loading: false,
                event: action.payload,
            };
        case EVENT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
