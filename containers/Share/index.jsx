import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Hero from 'components/Hero';
import withAuth from 'components/AuthProvider';
import FooterHero from 'components/FooterHero';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Row, Col } from 'antd';
import './index.scss';

const Share = props => (
  <>
    {props.data.seo ? (
      <Meta title={props.data.seo.title} description={props.data.seo.description} />
    ) : (
      <Meta title="Share" description="Share" />
    )}
    <PageContainer>
      <Header />
      <Hero noImage={true} hero={props.data.content.page_hero} />
      <div className="share-page">
        <div className="block">
          <Row type="flex" justify="center">
            <Col span={20} lg={{ span: 12 }} className="share-page-content-title text-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: props.data.content.introduction,
                }}
              ></div>
            </Col>
          </Row>
          <Row type="flex" justify="center" className="how-to">
            <Col span={20} lg={{ span: 14 }}>
              <div className="text-center">
                <h4 className="page-subtitle">{props.data.content.title}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.data.content.subtitle,
                  }}
                ></div>

                <img src={props.data.content.image[0].url} className="image" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <FooterHero />
      <Footer />
    </PageContainer>
  </>
);

// true or false as second parameter means authentication is required for this page.
export default withAuth(Share, false);
