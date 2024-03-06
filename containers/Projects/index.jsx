import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Hero from 'components/Hero';
import withAuth from 'components/AuthProvider';
import Articles from 'components/Articles';
import FooterHero from 'components/FooterHero';
import IntroInfo from 'components/IntroInfo';
import './index.scss';

const Projects = props => (
  <>
    {props.data.seo ? (
      <Meta title={props.data.seo.title} description={props.data.seo.description} />
    ) : (
      <Meta title="Projects" description="Projects" />
    )}
    <PageContainer>
      <Header />
      <div className="projects">
        <Hero hero={props.data.content.page_hero} />
        <IntroInfo data={props.data.content.intro_info} />

        <Articles articles={props.data.content.first_articles} backgroudColor={true} />
      </div>
      <FooterHero />
      <Footer />
    </PageContainer>
  </>
);

// true or false as second parameter means authentication is required for this page.
export default withAuth(Projects, false);
