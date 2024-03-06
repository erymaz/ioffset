import React from 'react';
import Component from 'containers/Subscribe';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const Page = props => {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  isLoggedIn && Router.push('/account');
  return <Component {...props} />;
};
export default Page;
