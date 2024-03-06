import { Row, Col, Button } from 'antd';
import './index.scss';

const ImageBanner = props => {
  const { backgroundImage, buttonText, price, title, subtitle } = props;
  return (
    <div
      className="block image"
      style={{ backgroundImage: backgroundImage && `url(${backgroundImage})` }}
    >
      <Row type="flex" justify="center" className="image-banner text-center">
        <Col span={20} lg={{ span: 14 }}>
          <h1 className="title">{title}</h1>
          <h2
            className="subtitle"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          ></h2>
          {buttonText && <Button type="primary">{buttonText}</Button>}
          {price && <p className="price">{price}</p>}
        </Col>
      </Row>
    </div>
  );
};

export default ImageBanner;
