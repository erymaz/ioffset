import { Row, Col } from 'antd';
import './index.scss';

const IntroInfoReverse = props => {
  return (
    <Row type="flex" justify="center">
      <Col span={20} md={{ span: 18 }}>
        <div className="block intro-info-reverse">
          <Row type="flex" justify="center" className="vertical-align-center">
            <Col span={24} md={{ span: 10 }} className="image-container">
              <img src={props.info.image_url[0].url} className="image" />
            </Col>
            <Col span={24} md={{ span: 10 }}>
              {props.info.pre_header && (
                <h4 className="pre-header">{props.info.pre_header}</h4>
              )}
              {props.info.header && (
                <h3 className="section-title">{props.info.header}</h3>
              )}
              {props.info.description && (
                <p
                  className="section-text"
                  dangerouslySetInnerHTML={{
                    __html: props.info.description
                  }}
                ></p>
              )}
              {props.info.link_text && (
                <Link href="/">
                  <a className="section-link">{props.info.link_text}</a>
                </Link>
              )}
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default IntroInfoReverse;
