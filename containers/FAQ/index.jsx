import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Hero from 'components/Hero';
import withAuth from 'components/AuthProvider';
import Header from 'components/Header';
import Footer from 'components/Footer';
import FooterHero from 'components/FooterHero';
import QandA from 'components/QandA';

const Faq = props => (
  <>
    {props.data.seo ? (
      <Meta title={props.data.seo.title} description={props.data.seo.description} />
    ) : (
      <Meta title="FAQ" description="FAQ" />
    )}
    <PageContainer>
      <Header />
      <Hero noImage={true} hero={props.data.content.page_hero} />
      <QandA qanda={props.data.content.qanda} />
      <FooterHero />
      <Footer />
    </PageContainer>
  </>
);

// true or false as second parameter means authentication is required for this page.
export default withAuth(Faq, false);
