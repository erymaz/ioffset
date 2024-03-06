import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import withAuth from 'components/AuthProvider';
import { Row, Col } from 'antd';
import './index.scss';

const PrivacyPolicy = props => {
  return (
    <>
      {props.data.seo ? (
        <Meta title={props.data.seo.title} description={props.data.seo.description} />
      ) : (
        <Meta title="Privacy Policy" description="Privacy Policy" />
      )}
      <PageContainer>
        <Header noHero={true} />
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 12 }}>
            <div className="block privacy-policy">
              <h1 className="section-title">{props.data.content.page_hero.title}</h1>
              {props.data.content.privacy_policy.map((content, key) => (
                <div key={key}>
                  {content.header && <p className="heading">{content.header}</p>}
                  <div
                    key={key}
                    dangerouslySetInnerHTML={{
                      __html: content.content,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Footer />
      </PageContainer>
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(PrivacyPolicy, false);
