// constants
import { RoleActionTypes } from "./constants";

export interface RoleActionType {
  type:
    | RoleActionTypes.API_RESPONSE_SUCCESS
    | RoleActionTypes.API_RESPONSE_ERROR
    | RoleActionTypes.GET_ROLE_AND_PERMISSION_SUCCESS
    | RoleActionTypes.GET_ROLE_AND_PERMISSION_ERROR
    | RoleActionTypes.FORGOT_PASSWORD_CHANGE
    // | RoleActionTypes.LOGIN_USER
    | RoleActionTypes.LOGOUT_USER
    | RoleActionTypes.RESET
    | RoleActionTypes.SIGNUP_USER;
  payload: {} | string;
}

interface EntityName {
  businessEntityName: string;
}

// export const roleApiResponseSuccess = (
//   actionType: string,
//   data: any | {}
// ): RoleActionType => ({
//   type: RoleActionTypes.API_RESPONSE_SUCCESS,
//   payload: { actionType, data },
// });
// // common error
// export const roleApiResponseError = (
//   actionType: string,
//   error: string
// ): RoleActionType => ({
//   type: RoleActionTypes.API_RESPONSE_ERROR,
//   payload: { actionType, error },
// });

export const getRoleSuccess = (businessEntityName: string): RoleActionType => ({
  type: RoleActionTypes.GET_ROLE_AND_PERMISSION_SUCCESS,
  payload: { businessEntityName },
});

export const getRoleError = (
  actionType: string,
  error: string
): RoleActionType => ({
  type: RoleActionTypes.GET_ROLE_AND_PERMISSION_ERROR,
  payload: { actionType, error },
});

// export const logoutUser = (): RoleActionType => ({
//   type: RoleActionTypes.LOGOUT_USER,
//   payload: {},
// });

// export const signupUser = (
//   fullname: string,
//   email: string,
//   password: string
// ): RoleActionType => ({
//   type: RoleActionTypes.SIGNUP_USER,
//   payload: { fullname, email, password },
// });

// export const forgotPassword = (email: string): RoleActionType => ({
//   type: RoleActionTypes.FORGOT_PASSWORD,
//   payload: { email },
// });

// export const resetAuth = (): RoleActionType => ({
//   type: RoleActionTypes.RESET,
//   payload: {},
// });
