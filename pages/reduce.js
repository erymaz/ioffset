import React from 'react';
import Component from 'containers/Reduce';
import Http from '../utils/Http';

const Page = props => {
  return <Component {...props} />;
};

Page.getInitialProps = async () => {
  const response = await Http.get('/pages/reduce');
  const response_data = await response.data;
  return { data: response_data.data };
};

export default Page;
