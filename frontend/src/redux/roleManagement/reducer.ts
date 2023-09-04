// apicore
import { APICore } from "../../helpers/api/apiCore";

// constants
import { RoleActionTypes } from "./constants";

// const api = new APICore();

const INIT_STATE = {
  RoleData: {},
  loading: false,
};

interface RoleData {
  roleName: string;
  permissions: [
    {
      moduleName: string;
      modulePermission: [];
    }
  ];
  createdBy: string;
  // createdOn: new Date(),
  associatedBusinessEntity: string;
}

interface RoleActionType {
  type:
    | RoleActionTypes.API_RESPONSE_SUCCESS
    | RoleActionTypes.API_RESPONSE_ERROR
    | RoleActionTypes.GET_ROLE_AND_PERMISSION_SUCCESS
    | RoleActionTypes.GET_ROLE_AND_PERMISSION_ERROR
    | RoleActionTypes.LOGOUT_USER
    | RoleActionTypes.RESET;
  payload: {
    actionType?: string;
    data?: RoleData | {};
    error?: string;
  };
}

interface State {
  RoleData?: RoleData | {};
  loading?: boolean;
  value?: boolean;
}

const Role = (state: State = INIT_STATE, action: RoleActionType): any => {
  switch (action.type) {
    // case RoleActionTypes.API_RESPONSE_SUCCESS:

    //   switch (action.payload.actionType) {
    //     case RoleActionTypes.GET_ROLE_AND_PERMISSION_SUCCESS: {
    //       return {
    //         ...state,
    //         businessEntityName: action.payload.data,
    //         // permissionReceived: true,
    //         loading: false,
    //       };
    //     }
    //     case RoleActionTypes.SIGNUP_USER: {
    //       return {
    //         ...state,
    //         loading: false,
    //         userSignUp: true,
    //       };
    //     }
    //     case RoleActionTypes.LOGOUT_USER: {
    //       return {
    //         ...state,
    //         user: null,
    //         loading: false,
    //         userLogout: true,
    //         permissionReceived: false,
    //       };
    //     }
    //     case RoleActionTypes.FORGOT_PASSWORD: {
    //       return {
    //         ...state,
    //         resetPasswordSuccess: action.payload.data,
    //         loading: false,
    //         passwordReset: true,
    //       };
    //     }
    //     default:
    //       return { ...state };
    //   }

    // case RoleActionTypes.API_RESPONSE_ERROR:
    //   switch (action.payload.actionType) {
    //     case RoleActionTypes.GET_ROLE_AND_PERMISSION_ERROR: {
    //       return {
    //         ...state,
    //         error: action.payload.error,
    //         // permissionReceived: false,
    //         loading: false,
    //       };
    //     }
    //     case RoleActionTypes.SIGNUP_USER: {
    //       return {
    //         ...state,
    //         registerError: action.payload.error,
    //         userSignUp: false,
    //         loading: false,
    //       };
    //     }
    //     case RoleActionTypes.FORGOT_PASSWORD: {
    //       return {
    //         ...state,
    //         error: action.payload.error,
    //         loading: false,
    //         passwordReset: false,
    //       };
    //     }
    //     default:
    //       return { ...state };
    //   }
    case RoleActionTypes.GET_ROLE_AND_PERMISSION_SUCCESS: {
      return {
        ...state,
        RoleData: action.payload.data,
        permissionReceived: true,
        loading: false,
      };
    }
    case RoleActionTypes.LOGOUT_USER:
      return { ...state, loading: true, userLogout: false };
    case RoleActionTypes.RESET:
      return {
        ...state,
        loading: false,
        error: false,
        userSignUp: false,
        permissionReceived: false,
        passwordReset: false,
        passwordChange: false,
        resetPasswordSuccess: null,
      };
    default:
      return { ...state };
  }
};

export default Role;
