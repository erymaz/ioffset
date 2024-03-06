import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import withAuth from 'components/AuthProvider';
import FooterHero from 'components/FooterHero';
import EmailVerify from '../../../components/EmailVerify';

const EmailVerificationPage = () => {
  return (
    <>
      <Meta title="Verify Email" description="Contact" />
      <Header noHero={true} />
      <PageContainer>
        <EmailVerify />
        <FooterHero />
        <Footer />
      </PageContainer>
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default EmailVerificationPage;
