import { all, fork, put, takeEvery, call } from "redux-saga/effects";

// apicore
import { APICore, setAuthorization } from "../../helpers/api/apiCore";

// helpers
import { rolePermissionApi } from "../../helpers/api/businessEntity";

// actions
import { getRoleSuccess, getRoleError } from "./action";

// constants
import { RoleActionTypes } from "./constants";

interface RoleData {
  payload: {
    businessEntityName: string;
  };
  type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and userPassword
 */
function* getRolePermissions({
  payload: { businessEntityName },
}: RoleData): any {
  try {
    // const businessEntityName = associatedBusinessEntity
    // console.log("first", businessEntityName);
    const response = yield call(rolePermissionApi, { businessEntityName });
    console.log("response", response);
    // console.log("second", RoleActionTypes.GET_ROLE_AND_PERMISSION_SUCCESS);
    yield put(getRoleSuccess(businessEntityName));
  } catch (error: any) {
    yield put(
      getRoleError(RoleActionTypes.GET_ROLE_AND_PERMISSION_ERROR, error)
    );
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

/**
 * Logout the user
 */
// function* logout(): SagaIterator {
//   try {
//     yield call(logoutApi);
//     api.setLoggedInUser(null);
//     setAuthorization(null);
//     yield put(authApiResponseSuccess(RoleActionTypes.LOGOUT_USER, {}));
//   } catch (error: any) {
//     yield put(authApiResponseError(RoleActionTypes.LOGOUT_USER, error));
//   }
// }

// function* signup({
//   payload: { fullname, userEmail, userPassword },
// }: RoleData): SagaIterator {
//   try {
//     const response = yield call(signupApi, {
//       fullname,
//       userEmail,
//       userPassword,
//     });
//     const user = response.data;
//     // api.setLoggedInUser(user);
//     // setAuthorization(user['token']);
//     yield put(authApiResponseSuccess(RoleActionTypes.SIGNUP_USER, user));
//   } catch (error: any) {
//     yield put(authApiResponseError(RoleActionTypes.SIGNUP_USER, error));
//     api.setLoggedInUser(null);
//     setAuthorization(null);
//   }
// }

// function* forgotuserPassword({
//   payload: { userEmail },
// }: RoleData): SagaIterator {
//   try {
//     const response = yield call(forgotuserPasswordApi, { userEmail });
//     yield put(
//       authApiResponseSuccess(RoleActionTypes.FORGOT_PASSWORD, response.data)
//     );
//   } catch (error: any) {
//     yield put(authApiResponseError(RoleActionTypes.FORGOT_PASSWORD, error));
//   }
// }
export function* watchGetRolePermission() {
  yield takeEvery(
    RoleActionTypes.GET_ROLE_AND_PERMISSION_SUCCESS,
    getRolePermissions
  );
}

// export function* watchLogout() {
//   yield takeEvery(RoleActionTypes.LOGOUT_USER, logout);
// }

// export function* watchSignup(): any {
//   yield takeEvery(RoleActionTypes.SIGNUP_USER, signup);
// }

// export function* watchForgotuserPassword(): any {
//   yield takeEvery(RoleActionTypes.FORGOT_PASSWORD, forgotuserPassword);
// }

function* roleSaga() {
  yield all([
    fork(watchGetRolePermission),
    // fork(watchLogout),
    // fork(watchSignup),
    // fork(watchForgotuserPassword),
  ]);
}

export default roleSaga;
