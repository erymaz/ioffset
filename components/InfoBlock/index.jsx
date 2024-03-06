import { Col, Button } from 'antd';
import Router from 'next/router';
import './index.scss';

const InfoBlock = props => {
  const { secondaryStyle, data } = props;
  return (
    <Col span={24} lg={{ span: 8 }}>
      <div
        className={`info-block text-center ${
          secondaryStyle ? 'secondary-style' : ''
        }`}
      >
        <h3 className="section-title">{data.title}</h3>
        <div
          className="section-text"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        <div className="button-container">
          <Button type="primary" onClick={() => Router.push(data.link)}>
            {data.link_text}
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default InfoBlock;
