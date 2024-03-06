import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import withAuth from 'components/AuthProvider';
import { Row, Col } from 'antd';
import './index.scss';

const TermsOfUse = props => {
  return (
    <>
      {props.data.seo ? (
        <Meta title={props.data.seo.title} description={props.data.seo.description} />
      ) : (
        <Meta title="Terms of Use" description="Terms Of Use" />
      )}
      <PageContainer>
        <Header noHero={true} />
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 12 }}>
            <div className="block tandc">
              <h1 className="section-title">{props.data.content.page_hero.title}</h1>
              {props.data.content.terms_conditions.map((content, key) => (
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
export default withAuth(TermsOfUse, false);
