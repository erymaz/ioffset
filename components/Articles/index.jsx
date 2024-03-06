import { Row, Col } from 'antd';
import './index.scss';
import SingleArticle from '../SingleArticle';

const Articles = props => {
  const { backgroudColor, articles, gradient } = props;
  return (
    <div
      className={`articles block ${gradient ? gradient : ''} ${
        backgroudColor ? 'lightGreen' : ''
      }`}
    >
      <Row type="flex" justify="center">
        <Col span={20} lg={{ span: 16 }}>
          <Row gutter={16} type="flex" justify="center">
            <div className="block">
              {articles.section_title && (
                <h3 className="title text-center">{articles.section_title}</h3>
              )}
              {articles.section_description && (
                <Col span={24} lg={{ span: 20, offset: 2 }}>
                  <p
                    className="text-center"
                    dangerouslySetInnerHTML={{
                      __html: articles.section_description,
                    }}
                  ></p>
                </Col>
              )}
              {articles.article.map((article, key) => (
                <SingleArticle key={key} article={article} />
              ))}
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Articles;
