import './index.scss';
import IntroInfoReverse from '../IntroInfoReverse';
import { Row, Col } from 'antd';
const Hero = props => {
  const { noImage, hero } = props;
  return (
    <div className={`block hero ${noImage ? 'no-image' : ''}`}>
      <Row type="flex" justify="center">
        <Col span={20} lg={{ span: 14 }}>
          <h1 className="page-title">{hero.title}</h1>
          <h2
            className="page-subtitle"
            dangerouslySetInnerHTML={{
              __html: hero.description
            }}
          ></h2>
        </Col>
      </Row>
      {!noImage && (
        <IntroInfoReverse info={hero.intro_info} image={props.image} />
      )}
    </div>
  );
};

export default Hero;
