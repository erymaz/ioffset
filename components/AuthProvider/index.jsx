import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from 'store/auth';
import Login from 'containers/Auth/Login';
import PageContainer from 'components/PageContainer';

const AuthProvider = (WrappedComponent, needAuth = false) => {
  return function ComponentWithAuth(props) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    React.useEffect(() => {
      dispatch(getUser());
    }, []);

    if (loading) {
      return <PageContainer loading />;
    }
    if (!isAuthenticated && !loading && needAuth) {
      return <Login />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthProvider;
