import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Link from 'next/link';
import './index.scss';
import NavBar from '../Navbar';

const Header = props => {
  const { noHero } = props;
  const [scrollTop, setScrollTop] = useState(0);
  const [mobileNavShow, setmobileNavShow] = useState(false);

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  return (
    <>
      <header
        className={`main-header ${
          scrollTop > 0 || mobileNavShow ? 'scrolling' : ''
        }`}
      >
        <Row type="flex" justify="center">
          <Link href="/">
            <a>
              <Col span={6} lg={{ span: 3 }}>
                <img
                  src={`../images/${
                    noHero || scrollTop > 0 || mobileNavShow
                      ? 'Logo-medium.svg'
                      : 'Logo-medium-white.svg'
                  }`}
                  className="logo"
                />
              </Col>
            </a>
          </Link>
          <Col span={16} xs={{ span: 12, offset: 2 }} lg={{ span: 15 }}>
            <div className="desktop-nav">
              <NavBar noHero={noHero} />
            </div>
            <button
              className={`theme-burger-btn ${mobileNavShow ? 'active' : ''} ${
                noHero ? 'no-background' : ''
              }`}
              onClick={() => setmobileNavShow(!mobileNavShow)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </Col>
        </Row>
      </header>
      <NavBar navState={mobileNavShow} mobile={true} />
    </>
  );
};

export default Header;
