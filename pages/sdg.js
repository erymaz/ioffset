import React from 'react';
import Component from 'containers/Sdg';
import Http from '../utils/Http';

const Page = props => {
  return <Component {...props} />;
};

Page.getInitialProps = async () => {
  const response = await Http.get('/pages/sdg');
  const response_data = await response.data;
  return { data: response_data.data };
};

export default Page;
