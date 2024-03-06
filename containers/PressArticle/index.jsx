import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import withAuth from 'components/AuthProvider';
import Header from 'components/Header';
import Footer from 'components/Footer';
import FooterHero from 'components/FooterHero';
import Hero from 'components/Hero';
import { Row, Col } from 'antd';
import './index.scss';

const Partners = props => {
  const page_hero = { title: props.data.title };
  return (
    <>
      <Meta title={`${props.data.title} - Press`} description="Press" />
      <PageContainer>
        <Header />
        <Hero hero={page_hero} noImage={true} />
        <Row type="flex" justify="center" className="single-article">
          <Col span={20} lg={{ span: 14 }}>
            <img src={props.data.content.image_url[0].url} className="image" />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 12 }}>
            <div
              className="block"
              dangerouslySetInnerHTML={{
                __html: props.data.content.description,
              }}
            ></div>
          </Col>
        </Row>

        <FooterHero />
        <Footer />
      </PageContainer>
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(Partners, false);
