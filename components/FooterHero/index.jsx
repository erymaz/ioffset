import { Row, Col, Button } from 'antd';
import Router from 'next/router';
import './index.scss';

const FooterHero = () => {
  return (
    <div
      className="footer-hero image"
      style={{ backgroundImage: "url('../images/footer-hero.png')" }}
    >
      <Row type="flex" justify="center" className="footer-hero text-center">
        <Col span={20} lg={{ span: 14 }}>
          <p className="subtitle">
            Individually We Can Make a Difference, Together We Make Change
          </p>
          <h4 className="title">
            Ready to make a difference and do the right thing?
          </h4>
          <Button type="primary" onClick={() => Router.push('/subscribe')}>
            Offset Now
          </Button>
          <p className="price">From £3 per month</p>
        </Col>
      </Row>
    </div>
  );
};

export default FooterHero;
