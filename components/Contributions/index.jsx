import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import './index.scss';
const Contributions = props => (
  <Row gutter={[16, { xs: 16, sm: 16 }]} type="flex" justify="center" className="contributions">
    <Col span={24}>
      <h3 className="section-title text-center">
        {props.profile.first_name}'s personal and network contribution since{' '}
        {moment(props.profile.created_at, 'DD/MM/YYYY').format('D MMMM YYYY')}
      </h3>
    </Col>
    <Col span={24} lg={{ span: 7 }}>
      <div className={`text-center contribution`}>
        <p className="section-title">Offset</p>
        <p className="contribution-text">
          {props.profile.offset_amount}
          <span className="subtext">/t</span>
        </p>
        <p className="subtext">of CO2</p>
      </div>
    </Col>
    <Col span={24} lg={{ span: 7 }}>
      <div className={`text-center contribution`}>
        <p className="section-title">Network</p>
        <p className="contribution-text">{props.profile.network}</p>
        <p className="subtext">connections</p>
      </div>
    </Col>
  </Row>
);

export default Contributions;
