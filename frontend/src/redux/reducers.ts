import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Role from './roleManagement/reducer';

export default combineReducers({
    Auth,
    Layout,
    Role
});
