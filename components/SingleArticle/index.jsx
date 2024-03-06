import { Col } from 'antd';
import Link from 'next/link';
import './index.scss';

const SingleArticle = props => {
  return (
    <Col span={24} lg={{ span: 12 }} className="single-article">
      <div
        className="article-image image"
        style={{
          backgroundImage: `url(${props.article.image_url[0].url})`,
        }}
      ></div>
      {props.title ? (
        <Link href={`/press/${props.slug}`}>
          <a className="article-title link">{props.title}</a>
        </Link>
      ) : (
        <h4 className="article-title">{props.article.title}</h4>
      )}
      <p className="text-lighter">{props.article.subtitle}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: props.excerpt ? props.excerpt : props.article.description,
        }}
        className="article-description"
      ></div>
    </Col>
  );
};

export default SingleArticle;
