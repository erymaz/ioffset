import React from 'react';
import './index.scss';
import { Row, Col } from 'antd';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer text-center">
      <Row type="flex" justify="center">
        <Col span={20} lg={{ span: 2 }} className="logo">
          <img src="../images/Logo-medium.svg" />
        </Col>
        <Col span={20} lg={{ span: 12 }}>
          <ul className="footer-list">
            <li>
              <Link href="/about">
                <a>About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <a>FAQ</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact Us</a>
              </Link>
            </li>
            <li>
              <Link href="/sdg">
                <a>UN SD Goals</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/termsofuse">
                <a>Terms and Conditions</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col span={20} lg={{ span: 3 }}>
          <div className="social text-center">
            <div className="icons">
              <img src="../images/icons/facebook-darkblue.svg" />
              <img src="../images/icons/twitter-darkblue.svg" />
              <img src="../images/icons/instagram-darkblue.svg" />
            </div>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
