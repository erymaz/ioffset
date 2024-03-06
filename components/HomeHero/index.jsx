import { Row, Col, Button, Icon } from 'antd';
import Router from 'next/router';
import './index.scss';

const HomeHero = props => {
  return (
    <div className="block">
      <Row type="flex" justify="center" className="home-hero text-center">
        <Col span={20} lg={{ span: 14 }}>
          <h1 className="home-page-title">{props.data.title}</h1>
          <div
            className="subtitle"
            dangerouslySetInnerHTML={{ __html: props.data.subtitle }}
          ></div>
          <Button type="primary" onClick={() => Router.push('/subscribe')}>
            Offset Now
          </Button>
        </Col>
      </Row>
      <Row type="flex" justify="center" className="text-center">
        <Col span={20} lg={{ span: 14 }}>
          <Icon
            type="down"
            style={{ fontSize: 35, color: 'rgba(255, 255, 255, 0.5)' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HomeHero;
