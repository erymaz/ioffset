import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import FooterHero from 'components/FooterHero';
import './index.scss';

const ErrorPage = () => {
  return (
    <>
      <Header noHero={true} />
      <PageContainer>
        <div className="block error">
          <p className="page-title">No Page Found</p>
        </div>
        <FooterHero />
        <Footer />
      </PageContainer>
    </>
  );
};

export default ErrorPage;
