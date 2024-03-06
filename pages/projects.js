import React from 'react';
import Component from 'containers/Projects';
import Http from '../utils/Http';

const Page = props => {
  return <Component {...props} />;
};

Page.getInitialProps = async () => {
  const response = await Http.get('/pages/projects');
  const response_data = await response.data;
  return { data: response_data.data };
};

export default Page;
