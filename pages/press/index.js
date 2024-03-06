import React from 'react';
import Component from 'containers/Press';
import Http from '../../utils/Http';

const Page = props => {
  return <Component {...props} />;
};

Page.getInitialProps = async () => {
  const response = await Http.get('/blogs');
  const response_data = await response.data;

  const page_response = await Http.get('/pages/press');
  const page_response_data = await page_response.data;
  return { data: response_data, page_data: page_response_data };
};

export default Page;
