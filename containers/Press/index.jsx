import React, { useState } from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import withAuth from 'components/AuthProvider';
import Header from 'components/Header';
import Footer from 'components/Footer';
import FooterHero from 'components/FooterHero';
import SingleArticle from 'components/SingleArticle';
import Hero from 'components/Hero';
import { Row, Col, Pagination } from 'antd';
import './index.scss';

const Press = props => {
  const articlesToShow = 8;
  const [paginationRange, setpaginationRange] = useState({
    min: 0,
    max: articlesToShow,
  });
  function onChange(pageNumber) {
    setpaginationRange({
      min: pageNumber * articlesToShow - articlesToShow,
      max: pageNumber * articlesToShow,
    });

    window.scrollTo(300, 0);
  }
  return (
    <>
      {props.page_data.data.seo ? (
        <Meta
          title={props.page_data.data.seo.title}
          description={props.page_data.data.seo.description}
        />
      ) : (
        <Meta title="Press" description="Press" />
      )}
      <PageContainer>
        <Header />
        <Hero hero={props.page_data.data.content.page_hero} noImage={true} />
        <div className={`press block `} style={{ Width: '100%' }}>
          <Row type="flex" justify="center">
            <Col span={20} lg={{ span: 16 }}>
              <div className="block">
                {props.data.data.map(
                  (article, key) =>
                    key >= paginationRange.min &&
                    key < paginationRange.max && (
                      <SingleArticle
                        key={key}
                        title={article.title}
                        article={article.content}
                        excerpt={article.excerpt}
                        slug={article.slug}
                      />
                    )
                )}
              </div>
              {props.data.data.length > articlesToShow && (
                <Pagination
                  defaultCurrent={1}
                  total={props.data.data.length}
                  pageSize={articlesToShow}
                  onChange={onChange}
                />
              )}
            </Col>
          </Row>
        </div>
        <FooterHero />
        <Footer />
      </PageContainer>
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(Press, false);
