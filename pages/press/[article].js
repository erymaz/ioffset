import React from 'react';
import Component from 'containers/PressArticle';
import Http from '../../utils/Http';

const Page = props => {
  return <Component {...props} />;
};

Page.getInitialProps = async ({ query }) => {
  const response = await Http.get(`/blogs/${query.article}`);
  const response_data = await response.data;
  return { data: response_data.data };
};

export default Page;
