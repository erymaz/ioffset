import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import withAuth from 'components/AuthProvider';
import FooterHero from 'components/FooterHero';
import Contact from 'components/Contact';

const ContactPage = props => {
  return (
    <>
      {props.data.seo ? (
        <Meta title={props.data.seo.title} description={props.data.seo.description} />
      ) : (
        <Meta title="Contact" description="Contact" />
      )}
      <Header noHero={true} />
      <PageContainer>
        <Contact data={props.data.content} />
        <FooterHero />
        <Footer />
      </PageContainer>
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(ContactPage, false);
