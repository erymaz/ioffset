import { Row, Col } from 'antd';
import InfoBlock from '../InfoBlock';
import Router from 'next/router';
import { Button } from 'antd';
import './index.scss';

const HeroInfo = props => {
  return (
    <div className="hero-info-intro block">
      <Row type="flex" justify="center">
        <Col span={20} lg={{ span: 16 }}>
          <Row gutter={[16, { xs: 16, sm: 16 }]} type="flex" justify="center">
            <Col span={24}>
              <div className="block">
                {props.data &&
                  props.data.three_info_block.map((infoBlock, key) => (
                    <InfoBlock key={key} data={infoBlock} />
                  ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={22} lg={{ span: 18 }}>
          <div className="block intro-info">
            <Row
              type="flex"
              justify="center"
              gutter={32}
              className="vertical-align-center"
            >
              <Col span={20} lg={{ span: 10 }}>
                {props.data && props.data.intro_info.pre_header && (
                  <h4 className="pre-header">
                    {props.data.intro_info.pre_header}
                  </h4>
                )}
                {props.data && props.data.intro_info.header && (
                  <h3 className="section-title">
                    {props.data.intro_info.header}
                  </h3>
                )}
                {props.data && props.data.intro_info.description && (
                  <p
                    className="section-text"
                    dangerouslySetInnerHTML={{
                      __html: props.data.intro_info.description,
                    }}
                  ></p>
                )}
                {props.data && props.data.intro_info.link_text && (
                  <Button
                    type="primary"
                    onClick={() => Router.push('/subscribe')}
                  >
                    {props.data && props.data.intro_info.link_text}
                  </Button>
                )}
              </Col>
              <Col span={20} lg={{ span: 10 }}>
                <div className="image_container">
                  {/* <img
                    src={props.data.intro_info.image_url[0].url}
                    className="image"
                  /> */}
                  <div
                    className="video"
                    style={{
                      position: 'relative',
                      paddingBottom: '56.25%',
                      paddingTop: 25,
                      height: 0,
                    }}
                  >
                    <iframe
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                      src="https://www.youtube.com/embed/UllV0aIz1ho?autoplay=0&showinfo=0&controls=0&modestbranding=1&frameborder=0"
                      frameborder="0"
                      modestbranding="1"
                      autoplay="0"
                      showinfo="0"
                      controls="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeroInfo;
