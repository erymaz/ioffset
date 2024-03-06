import { Row, Col, Tabs } from 'antd';
import { useState } from 'react';
import SingleSubscription from '../SingleSubscriptions';
import Register from '../Register';
import './index.scss';
const Subscriptions = props => {
  const { subscriptions } = props;
  const [payFrequency, setpayFrequency] = useState('monthly');
  const [activeTabKey, setactiveTabKey] = useState('1');
  const [selectedSubscription, setselectedSubscription] = useState({
    id: null,
    name: null,
    plan: null,
    price: null
  });
  const { TabPane } = Tabs;

  console.log('----------->', subscriptions);

  return (
    <div className="block text-center subscriptions">
      <p className="page-title">Offset Now</p>
      <p className="page-subtitle text-primary-opacity-50">
        {`Carbon Footprint - ${
          activeTabKey === '3' ? 'Business Packages' : 'Lifestyle Examples'
        }`}
      </p>
      <p className="text-primary-opacity-50">
        Calculated by Mike Berners-Lee &amp; SW Consulting
      </p>
      <p className="select-package-text">
        {`Select the package that most suits your ${
          activeTabKey === '3' ? 'business' : 'lifestyle'
        } and offset your carbon footprint today `}
      </p>
      {selectedSubscription.id ? (
        <Register
          plan={selectedSubscription}
          changeSubscription={() =>
            setselectedSubscription({
              id: null,
              name: null,
              plan: null,
              price: null
            })
          }
        />
      ) : (
        <>
          <div className="toggle">
            <p className="payment-frequency text-lighter">Pay Monthly</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={payFrequency === 'monthly' ? false : true}
                onChange={() =>
                  setpayFrequency(
                    payFrequency === 'monthly' ? 'annually' : 'monthly'
                  )
                }
              />
              <span className="slider round"></span>
            </label>
            <p className="payment-frequency annual text-primary-opacity-50">
              Pay Annually (save 10%)
            </p>
          </div>
          <Tabs
            defaultActiveKey={activeTabKey}
            size="large"
            className="tabs"
            onChange={activeKey => setactiveTabKey(activeKey)}
          >
            <TabPane tab="Personal" key="1">
              <Row gutter={32} type="flex" justify="center">
                {subscriptions[payFrequency][0].personal?.map(
                  (subscription, key) => (
                    <Col span={24} lg={{ span: 7 }} xl={{ span: 6 }} key={key}>
                      <SingleSubscription
                        subscription={subscription}
                        selectedSubscription={setselectedSubscription}
                        payFrequency={payFrequency}
                        item={key}
                        plan="Personal"
                      />
                    </Col>
                  )
                )}
              </Row>
            </TabPane>
            <TabPane tab="Family" key="2">
              <Row gutter={32} type="flex" justify="center">
                {subscriptions[payFrequency][0].family?.map(
                  (subscription, key) => (
                    <Col span={24} lg={{ span: 7 }} xl={{ span: 6 }} key={key}>
                      <SingleSubscription
                        subscription={subscription}
                        selectedSubscription={setselectedSubscription}
                        payFrequency={payFrequency}
                        item={key}
                        plan="Family"
                      />
                    </Col>
                  )
                )}
              </Row>
            </TabPane>
            <TabPane tab="Business" key="3">
              <Row gutter={32} type="flex" justify="center">
                {subscriptions[payFrequency][0].business.map(
                  (subscription, key) => (
                    <Col span={24} lg={{ span: 7 }} xl={{ span: 6 }} key={key}>
                      <SingleSubscription
                        subscription={subscription}
                        selectedSubscription={setselectedSubscription}
                        payFrequency={payFrequency}
                        item={key}
                        plan="Business"
                      />
                    </Col>
                  )
                )}
              </Row>
            </TabPane>
          </Tabs>
          <Row>
            <Col xs={{ span: 18, offset: 3 }}>
              <p className="tax text-primary-opacity-50">
                Tax = 1.7 tonnes per person. All packages contain 1.7 tonne
                carbon footprint contribution to reflect emissions generated per
                capita from public services such as hospitals, schools, street
                lighting and roads
              </p>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Subscriptions;
