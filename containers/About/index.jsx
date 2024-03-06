import React, { useEffect } from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Hero from 'components/Hero';
import withAuth from 'components/AuthProvider';
import InfoBlock from 'components/InfoBlock';
import FooterHero from 'components/FooterHero';
import { Row, Col } from 'antd';
import './index.scss';
import ImageBanner from 'components/ImageBanner';
const About = props => (
  <>
    {props.data.seo ? (
      <Meta title={props.data.seo.title} description={props.data.seo.description} />
    ) : (
      <Meta title="About Us" description="About Us" />
    )}
    <PageContainer>
      <Header />
      <Hero noImage={true} hero={props.data.content.page_hero} />
      <div className="about">
        <Row type="flex" justify="center" className="block text-center">
          <Col span={20} lg={{ span: 9 }}>
            <p className="text-lighter">{props.data.content.text_block_1.pre_title}</p>
            <h3 className="section-title">{props.data.content.text_block_1.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: props.data.content.text_block_1.sub_title,
              }}
            ></div>
          </Col>
        </Row>
        <Row type="flex" justify="center" className="block">
          <Col span={20} lg={{ span: 16 }}>
            <img src={props.data.content.image_1_url[0].url} className="image" />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="block tertiary-background">
          <Col span={20} lg={{ span: 16 }} className="text-center">
            <p className="text-lighter">{props.data.content.text_block_2.pre_title}</p>
            <h3 className="section-title">{props.data.content.text_block_2.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: props.data.content.text_block_2.sub_title,
              }}
            ></div>
            <br />
            <h3 className="section-title">How iOffset works</h3>
          </Col>
          <Col span={20} lg={{ span: 16 }}>
            <Row gutter={[16, { xs: 16, sm: 16 }]} type="flex" justify="center">
              <Col span={24} className="about-info-block">
                {props.data.content.three_info_block.map((infoBlock, key) => (
                  <InfoBlock key={key} data={infoBlock} secondaryStyle={true} />
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
        <ImageBanner
          title={props.data.content.image_banner.title}
          subtitle={props.data.content.image_banner.subtitle}
          backgroundImage={props.data.content.image_banner.backgroundImage[0].url}
          buttonText={props.data.content.image_banner.buttonText}
          price="From £3 per month"
        />
        <Row type="flex" justify="center" className="block text-center">
          <Col span={20} lg={{ span: 10 }}>
            <p className="text-lighter">{props.data.content.text_block_3.pre_title}</p>
            <h3 className="section-title">{props.data.content.text_block_3.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: props.data.content.text_block_3.sub_title,
              }}
            ></div>
          </Col>
        </Row>
        <Row type="flex" justify="center" className="block text-center">
          <Col span={20} lg={{ span: 16 }}>
            <img src={props.data.content.image_2_url[0].url} className="image" />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="block">
          <Col span={20} lg={{ span: 10 }}>
            <p className="text-lighter">{props.data.content.text_block_4.pre_title}</p>
            <h3 className="section-title text-center">{props.data.content.text_block_4.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: props.data.content.text_block_4.sub_title,
              }}
            ></div>
          </Col>
        </Row>
        <ImageBanner
          title={props.data.content.image_banner_2.title}
          subtitle={props.data.content.image_banner_2.subtitle}
          backgroundImage={props.data.content.image_banner_2.backgroundImage[0].url}
          buttonText={props.data.content.image_banner_2.buttonText}
          price={props.data.content.image_banner_2.price}
        />
        <Row type="flex" justify="center" className="block text-center">
          <Col span={20} lg={{ span: 10 }}>
            <p className="text-lighter">{props.data.content.text_block_5.pre_title}</p>
            <h3 className="section-title">{props.data.content.text_block_5.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: props.data.content.text_block_5.sub_title,
              }}
            ></div>
          </Col>
        </Row>
      </div>
      <FooterHero />
      <Footer />
    </PageContainer>
  </>
);

// true or false as second parameter means authentication is required for this page.
export default withAuth(About, false);
