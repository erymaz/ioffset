import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import HomeHero from 'components/HomeHero';
import HeroInfo from 'components/HeroInfo';
import withAuth from 'components/AuthProvider';
import Articles from 'components/Articles';
import FooterHero from 'components/FooterHero';
import { Carousel } from 'antd';
import './index.scss';

const Home = props => {
  const BackgroundImageSlide = props => (
    <div
      className="image"
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
  return (
    <>
      {props.data.seo ? (
        <Meta title={props.data.seo.title} description={props.data.seo.description} />
      ) : (
        <Meta
          title="Reduce - Offset - Share"
          description="iOffset enables you to reduce and offset your carbon footprint by funding renewable energy projects & planting trees in the UK "
        />
      )}
      <Header />
      <PageContainer>
        <Carousel effect="fade" autoplay={true} dots={false}>
          {props.data.content.backgroundImages.map((image, key) => (
            <BackgroundImageSlide key={key} image={image.url} />
          ))}
        </Carousel>
        <HomeHero data={props.data.content} />
        <HeroInfo data={props.data.content} />
        <Articles articles={props.data.content.first_articles} gradient="gradient" />
        <Articles articles={props.data.content.second_articles} backgroudColor={false} />
        <FooterHero />
        <Footer />
      </PageContainer>
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(Home, false);
