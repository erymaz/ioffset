import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Hero from 'components/Hero';
import withAuth from 'components/AuthProvider';
import FooterHero from 'components/FooterHero';
import { Row, Col } from 'antd';
import './index.scss';
import ReducePageContent from 'components/ReducePageContent';

const Reduce = props => (
  <>
    {props.data.seo ? (
      <Meta title={props.data.seo.title} description={props.data.seo.description} />
    ) : (
      <Meta title="Reduce" description="Reduce" />
    )}
    <PageContainer>
      <Header />
      <Hero hero={props.data.content.page_hero} noImage={true} />
      <div className="reduce-page block">
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 10 }} className="reduce-page-content-title">
            <div
              className="intro-list"
              dangerouslySetInnerHTML={{
                __html: props.data.content.intro_content.description,
              }}
            ></div>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 10 }}>
            <h4
              className="page-subtitle"
              dangerouslySetInnerHTML={{
                __html: props.data.content.intro_content.image_title,
              }}
            ></h4>
            <img src={props.data.content.intro_content.image[0].url} className="image" />
            <p
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: props.data.content.intro_content.image_footer,
              }}
            ></p>
          </Col>
        </Row>
        {props.data.content.reduce_page_content.map((content, key) => {
          return <ReducePageContent key={key} content={content} />;
        })}
      </div>
      <FooterHero />
      <Footer />
    </PageContainer>
  </>
);

// true or false as second parameter means authentication is required for this page.
export default withAuth(Reduce, false);
