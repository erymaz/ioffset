import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Hero from 'components/Hero';
import withAuth from 'components/AuthProvider';
import Header from 'components/Header';
import Footer from 'components/Footer';
import FooterHero from 'components/FooterHero';
import IntroInfo from 'components/IntroInfo';
import IntroInfoReverse from 'components/IntroInfoReverse';

const Partners = props => (
  <>
    {props.data.seo ? (
      <Meta title={props.data.seo.title} description={props.data.seo.description} />
    ) : (
      <Meta title="Partners" description="Partners" />
    )}
    <PageContainer>
      <Header />
      <Hero
        hero={props.data.content.page_hero}
        image={props.data.content.page_hero.intro_info.image_url[0].url}
      />
      <IntroInfo
        data={props.data.content.intro_info_1}
        image={props.data.content.intro_info_1.image_url[0].url}
      />
      <IntroInfoReverse
        info={props.data.content.intro_info_reverse}
        image={props.data.content.intro_info_reverse.image_url[0].url}
      />
      <IntroInfo
        data={props.data.content.intro_info_2}
        image={props.data.content.intro_info_2.image_url[0].url}
      />
      <FooterHero />
      <Footer />
    </PageContainer>
  </>
);

// true or false as second parameter means authentication is required for this page.
export default withAuth(Partners, false);
