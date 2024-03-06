import React, { useState } from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import withAuth from 'components/AuthProvider';
import { Row, Col, Modal } from 'antd';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import AccountOverview from 'components/AccountOverview';
import AccountProfile from 'components/AccountProfile';
import AccountSubscription from 'components/AccountSubscription';
import StripePayment from 'components/StripePayment';
import AccountSubSideBar from '../../components/AccountSubSideBar';
import Cookie from 'js-cookie';
import './index.scss';
const Account = () => {
  const [selectedTab, setselectedTab] = useState('Overview');
  const tabs = ['Overview', 'Account', 'Subscription'];
  const user = useSelector(state => state.auth.user);
  const [modalVisible, setmodalVisible] = useState(false);
  const [paid, setpaid] = useState(null);
  const hasToken = Cookie.get('token');

  const handleCancel = e => {
    setmodalVisible(false);
  };

  return (
    <>
      <Meta title="Your Account" description="Account" />
      <PageContainer>
        <Header noHero={true} />
        <div className="block account">
          <Row type="flex" justify="center">
            {user && user.payment_required && (
              <Modal
                title="Payment Details"
                visible={
                  user.payment_required
                    ? paid !== 'paid'
                      ? true
                      : false
                    : false
                }
                onCancel={() => handleCancel()}
                footer={null}
              >
                <StripePayment
                  user={hasToken}
                  price={user.subscription_price}
                  userDetails={
                    user && [user.first_name, user.last_name, user.email]
                  }
                  notAccountPage={false}
                  paid={paid => setpaid(paid)}
                />
              </Modal>
            )}
            <Col span={22} xl={{ span: 6 }}>
              <div className="sidebar">
                <ul>
                  {tabs.map((tab, key) => (
                    <li
                      key={key}
                      className={selectedTab === tab ? 'selected' : ''}
                      onClick={() => setselectedTab(tab)}
                    >
                      <span className={`icon icon-${tab}`}></span>
                      {tab}
                    </li>
                  ))}
                  {user && (
                    <Link href={`/${user.username}`}>
                      <a className="profile">
                        <li>
                          <span className={`icon icon-page`}></span>
                          My Profile
                        </li>
                      </a>
                    </Link>
                  )}
                </ul>
              </div>
              <AccountSubSideBar view="desktop" />
            </Col>
            <Col span={22} xl={{ span: 10 }}>
              {selectedTab === 'Overview' ? (
                <AccountOverview />
              ) : selectedTab === 'Account' ? (
                <AccountProfile />
              ) : (
                selectedTab === 'Subscription' && <AccountSubscription />
              )}
            </Col>
            <Col span={22} xl={{ span: 13 }}>
              <AccountSubSideBar view="mobile" />
            </Col>
          </Row>
        </div>
      </PageContainer>
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(Account, true);
