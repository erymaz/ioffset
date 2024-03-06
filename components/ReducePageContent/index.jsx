import { Row, Col } from 'antd';
import './index.scss';

const ReducePageContent = props => {
  return (
    <div className="reduce-page-content">
      <Row type="flex" justify="center">
        <Col span={20} lg={{ span: 10 }}>
          <h4 className="section-title">{props.content.title}</h4>
          <div
            className="section-text"
            dangerouslySetInnerHTML={{
              __html: props.content.description
            }}
          ></div>
        </Col>
      </Row>
      {props.content.img && (
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 12 }}>
            <img src={props.content.img[0].url} className="image" />
          </Col>
        </Row>
      )}
      {props.content.description_second && (
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 10 }}>
            <div
              className="section-text-second"
              dangerouslySetInnerHTML={{
                __html: props.content.description_second
              }}
            ></div>
          </Col>
        </Row>
      )}
      {props.content.targets && props.content.targets.length !== 0 && (
        <Row type="flex" justify="center">
          <Col span={20} lg={{ span: 10 }}>
            <ul className="targets">
              <p className="targets-title">iOffset Target:</p>
              {props.content.targets.map((target, key) => (
                <li
                  key={key}
                  className="single-target"
                  dangerouslySetInnerHTML={{
                    __html: '-&nbsp;' + target
                  }}
                ></li>
              ))}
            </ul>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ReducePageContent;
