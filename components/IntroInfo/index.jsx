import { Row, Col } from 'antd';
import Link from 'next/link';
import './index.scss';

const IntroInfo = props => {
  return (
    <Row type="flex" justify="center">
      <Col span={20} md={{ span: 18 }}>
        <div className="block intro-info">
          <Row type="flex" justify="center" className="vertical-align-center">
            <Col span={24} md={{ span: 10 }}>
              {!props.data.pre_header && <h4 className="pre-header">ytu</h4>}
              {props.data.header && (
                <h3 className="section-title">{props.data.header}</h3>
              )}
              {props.data.description && (
                <p
                  className="section-text"
                  dangerouslySetInnerHTML={{
                    __html: props.data.description
                  }}
                ></p>
              )}
              {props.data.link_text && (
                <Link href="/">
                  <a className="section-link">{props.data.link_text}</a>
                </Link>
              )}
            </Col>
            <Col span={24} md={{ span: 10 }}>
              <div className="image_container">
                <img src={props.data.image_url[0].url} className="image" />
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default IntroInfo;
