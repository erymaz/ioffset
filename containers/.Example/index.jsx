import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import withAuth from 'components/AuthProvider';
import './index.scss';

const About = props => {
  return (
    <>
      <Meta title="iOffset | About Us" description="About us" />
      <PageContainer>This is a page</PageContainer>
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(About, true);
