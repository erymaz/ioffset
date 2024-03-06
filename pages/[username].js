import React from 'react';
import Component from 'containers/Profile';
import Http from '../utils/Http';

const Profile = props => {
  return <Component {...props} />;
};

Profile.getInitialProps = async () => {
  const response = await Http.get('/pages/profile');
  const response_data = await response.data;
  return { projects: response_data.data };
};

export default Profile;
