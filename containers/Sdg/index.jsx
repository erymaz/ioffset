import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Hero from 'components/Hero';
import withAuth from 'components/AuthProvider';
import FooterHero from 'components/FooterHero';
import { Row, Col } from 'antd';

const Sdg = props => (
  <>
    {props.data.seo ? (
      <Meta title={props.data.seo.title} description={props.data.seo.description} />
    ) : (
      <Meta title="SDG" description="SDG" />
    )}
    <PageContainer>
      <Header />
      <Hero noImage={true} hero={props.data.content.page_hero} />
      <div className="about">
        <Row type="flex" justify="center" className="block text-center">
          <Col span={20} lg={{ span: 9 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: props.data.content.text_block_1.sub_title,
              }}
            ></div>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 16 }}>
            <img src={props.data.content.image_1_url[0].url} className="image" />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="block">
          <Col span={20} lg={{ span: 9 }}>
            <p className="text-lighter">{props.data.content.text_block_2.pre_title}</p>
            <h3 className="section-title">{props.data.content.text_block_2.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: props.data.content.text_block_2.sub_title,
              }}
            ></div>
          </Col>
        </Row>
        <Row type="flex" justify="center" className="block text-center">
          <Col span={20} lg={{ span: 16 }}>
            <img src={props.data.content.image_2_url[0].url} className="image" />
          </Col>
        </Row>
      </div>
      <FooterHero />
      <Footer />
    </PageContainer>
  </>
);

// true or false as second parameter means authentication is required for this page.
export default withAuth(Sdg, false);
