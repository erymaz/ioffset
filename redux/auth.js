import { createSlice } from '@reduxjs/toolkit';
import Http from 'utils/Http';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'auth',
  initialState: {
    permissions: [],
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false
  },
  reducers: {
    authStatus(state, action) {
      state.isAuthenticated = action.payload;
      state.loading = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    authLogout(state) {
      state.user = null;
      state.loading = false;
    },
    loginSuccess(state, action) {
      state.error = null;
    },
    loginError(state, action) {
      state.error = action.payload;
    },
    authLoading(state) {
      state.loading = true;
    }
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = slice;

export function getUser() {
  return async dispatch => {
    const hasToken = Cookie.get('token');
    if (hasToken) {
      Http.defaults.headers.common.Authorization = `Bearer ${Cookie.get(
        'token'
      )}`;
    } else {
      dispatch(actions.authStatus(false));
      dispatch(actions.setUser(null));
    }
    dispatch(actions.authLoading());
    Http.get('dashboard/auth/current')
      .then(res => {
        dispatch(actions.setUser(res.data.data));
        dispatch(actions.authStatus(true));
      })
      .catch(() => {
        dispatch(actions.authStatus(false));
        dispatch(actions.setUser(null));
      });
  };
}

export function login(values) {
  return async dispatch => {
    dispatch(actions.authLoading());

    Http.post('/auth/login', values)
      .then(res => {
        Cookie.set('token', res.data.success.token);
        Http.defaults.headers.common.Authorization = `Bearer ${res.data.success.token}`;
        dispatch(actions.authStatus(true));
        Router.push('/account');
      })
      .catch(err => {
        if (!err.response) {
          toast.warning('Error logging in');
          dispatch(actions.loginError('No response from server'));
          dispatch(actions.authStatus(false));
        } else {
          toast.warning('Error logging in');
          // dispatch(actions.loginError(err.response.data.error.message));
          dispatch(actions.authStatus(false));
        }
      });
  };
}

export function logout() {
  return async dispatch => {
    dispatch(actions.authLoading());

    Http.post('/auth/logout')
      .then(() => {
        dispatch(actions.authStatus(false));
        Cookie.remove('token');
        toast.success('You have been logged out');
      })
      .catch(() => {
        toast.warning('Error logging out');
        Cookie.remove('token');
        dispatch(actions.authStatus(false));
      });
  };
}

// Export the reducer, either as a default or named export
export default reducer;
