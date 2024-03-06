import React, { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import Http from '../../utils/Http';
import { Formik, Form, Field } from 'formik';
import { Button, Modal, Input, InputNumber, Collapse } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import StripePayment from '../StripePayment';
import { AntInput } from 'utils/createFields';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import * as Yup from 'yup';
import './index.scss';
const { Panel } = Collapse;

const AccountSubscription = () => {
  const [subscription, setsubscription] = useState('');
  const [newAdults, setnewAdults] = useState('');
  const [newChildren, setnewChildren] = useState('');
  const [newSubscription, setnewSubscription] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);
  const [newPayFrequency, setnewPayFrequency] = useState('');
  const [modalCloseAccountVisible, setmodalCloseAccountVisible] = useState(
    false
  );
  const [password, setpassword] = useState('');
  const [subscriptionPlans, setsubscriptionPlans] = useState('');
  const [loading, setloading] = useState(false);
  const hasToken = Cookie.get('token');
  const user = useSelector(state => state.auth.user);
  const stripeUserDetails = [user.first_name, user.last_name, user.email];

  const getSubscriptionDetails = () => {
    setloading(true);
    Http.get('/dashboard/subscription')
      .then(function(response) {
        setsubscription(response.data.data);
        setloading(false);
      })
      .catch(function(error) {
        setloading(false);
      });
  };
  useEffect(() => {
    getSubscriptionDetails();
  }, []);

  const showModal = () => {
    Http.get('/subscription-plans')
      .then(function(response) {
        setsubscriptionPlans(response.data.data);
        setloading(false);
      })
      .catch(function(error) {
        console.log(error);
      });
    setnewChildren(subscription.family_members.children);
    setnewAdults(subscription.family_members.adults);
    setmodalVisible(true);
  };

  const handleCancel = e => {
    setmodalVisible(false);
  };

  const submitDelete = () => {
    setloading(true);
    Http.delete('/dashboard/delete-account', {
      data: {
        id: user.id,
        password: password
      }
    })
      .then(function(response) {
        setmodalVisible(false);
        setloading(false);
        toast.success(response.data.data);
      })
      .catch(function(response) {
        setmodalVisible(false);
        setloading(false);
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error submitting form, please try later');
      });
  };

  const updatePlan = (plan, frequency) => {
    setnewSubscription(plan);
    setnewPayFrequency(frequency);
  };
  const handlePaymentUpdateSubmit = values => {
    setloading(true);
    Http.put('/dashboard/bank-details', values)
      .then(function(response) {
        toast.success(response.data.data);
        setloading(false);
      })
      .catch(function(response) {
        setloading(false);
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error submitting form, please try later');
      });
  };

  const Schema = Yup.object().shape({
    account_holder_name: Yup.string().required('Required'),
    acc_number: Yup.string()
      .required('Required')
      .length(8, `Account Number must be 8 numbers long`),
    sort_code: Yup.string()
      .required('Required')
      .length(6, `Sort Code must be 6 numbers long`)
  });

  const increment = person => {
    calculatePrice();
    person === 'adult'
      ? setnewAdults(newAdults + 1)
      : setnewChildren(newChildren + 1);
  };
  const decrement = person => {
    calculatePrice();
    person === 'adult'
      ? setnewAdults(newAdults - 1)
      : setnewChildren(newChildren - 1);
  };

  const showCloseAccountModal = () => {
    setmodalCloseAccountVisible(true);
  };

  const hideCloseAccountModal = () => {
    setmodalCloseAccountVisible(false);
  };

  const calculatePrice = () => {
    const childPrice =
      ((newSubscription
        ? newSubscription.price
        : subscription.plan_details.price) /
        2) *
      newChildren;

    const adultPrice =
      (newSubscription
        ? newSubscription.price
        : subscription.plan_details.price) * newAdults;
    return (
      (childPrice +
        adultPrice +
        (newSubscription
          ? newSubscription.price
          : subscription.plan_details.price)) /
      100
    );
  };
  const submitUpdatedSubscription = () => {
    const subscriptionData = {
      adults: newAdults,
      children: newChildren,
      plan: {
        id: newSubscription.id
      }
    };

    setloading(true);
    Http.put('/dashboard/subscription', subscriptionData)
      .then(function(response) {
        setloading(false);
        setmodalVisible(false);
        getSubscriptionDetails();
        toast.success(response.data.data);
      })
      .catch(function(response) {
        setloading(false);
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error submitting form, please try later');
      });
  };
  return loading ? (
    <Loader />
  ) : (
    subscription && (
      <div className="subscription-container">
        <div className="subscription">
          <h1 className="title">Your iOffset Subscription</h1>
          <p>Details of your subscription</p>
          <div>
            <div className="plan">
              <p className="plan-header">
                {subscription.plan_details.subscription_tier} -{' '}
                {subscription.plan_details.selected_subscription} Carbon
                Footprint
              </p>
              <p className="subtext">
                13 tonnes, £{subscription.plan_details.price / 100}{' '}
                {subscription.plan_details.payment_frequency}
              </p>
            </div>
          </div>
          <p className="existing_billing_header">
            Existing Billing Information
          </p>
          <p className="existing_billing">
            Exisiting Bank: {subscription.billing_information.card_type}
            <br />
            Expiry Year: {subscription.billing_information.exp_year}
            <br />
            Exisiting Account Number (Last 4 digits):{' '}
            {subscription.billing_information.last_numbers}
          </p>
          <p className="existing_billing_header">Update Billing Information</p>
          <div className="stripe">
            <StripePayment
              user={hasToken}
              price={subscription.plan_details.price}
              userDetails={stripeUserDetails}
              update={true}
              notAccountPage={false}
            />
          </div>
          <p className="subscription-form-header">Update your subscription</p>
          <div className="plan-container add-new" onClick={() => showModal()}>
            <UserSwitchOutlined
              style={{ fontSize: '48px', float: 'left', marginRight: '20px' }}
            />
            <div className="plan">
              <p className="plan-header">Update Subscription</p>
              <p className="subtext">
                Billed {subscription.plan_details.payment_frequency}
              </p>
            </div>
          </div>
          <Modal
            title="Update Subscription"
            visible={modalVisible}
            onCancel={() => handleCancel()}
            footer={null}
            className="update_subscription_modal"
          >
            {subscription.plan_details.subscription_tier === 'Family' ? (
              <p className="plan-header">Add or Change Subscription</p>
            ) : (
              <p className="plan-header">Change Subscription</p>
            )}

            <Formik
              initialValues={{
                data: {
                  adults: newAdults,
                  children: newChildren,
                  plan: {
                    id: 1
                  }
                }
              }}
              onSubmit={values => {
                handleSubscriptionUpdate(values);
              }}
            >
              <Form
                className="form-container"
                style={{ marginBottom: 20, marginTop: 40 }}
              >
                {subscription.plan_details.subscription_tier === 'Family' && (
                  <>
                    <div className="adults">
                      <p className="subtext">Number of adults</p>
                      <Field
                        component={InputNumber}
                        value={newAdults}
                        name="data.adults"
                        type="text"
                        size="large"
                        hasFeedback
                      />
                      <Button
                        icon="plus"
                        className="plus"
                        size="large"
                        onClick={() => increment('adult')}
                      />
                      <Button
                        icon="minus"
                        className="minus"
                        size="large"
                        onClick={() => decrement('adult')}
                      />
                    </div>
                    <div className="children">
                      <p className="subtext">Number of children</p>
                      <Field
                        component={InputNumber}
                        value={newChildren}
                        name="data.children"
                        type="text"
                        size="large"
                        hasFeedback
                      />
                      <Button
                        icon="plus"
                        className="plus"
                        onClick={() => increment('children')}
                        size="large"
                      />
                      <Button
                        icon="minus"
                        className="minus"
                        onClick={() => decrement('children')}
                        size="large"
                      />
                    </div>
                  </>
                )}
                {subscription.plan_details.subscription_tier === 'Personal' && (
                  <Collapse>
                    <Panel header="Monthly" key="1">
                      {subscriptionPlans.monthly &&
                        subscriptionPlans.monthly[0].personal.map(
                          (plan, key) => (
                            <div key={key} className="subscription_plan">
                              <p className="plan-name">
                                Plan Name : {plan.title}
                              </p>
                              <p className="plan-price">
                                Price : £
                                {plan.price.toString().slice(-2) !== '00'
                                  ? (plan.price / 100).toFixed(2)
                                  : plan.price / 100}
                              </p>
                              <Button
                                type="primary"
                                size="small"
                                className={
                                  newSubscription.id === plan.id
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() => updatePlan(plan, 'Monthly')}
                                disabled={
                                  subscription.plan_details.id === plan.id
                                    ? true
                                    : false
                                }
                              >
                                {subscription.plan_details.id === plan.id
                                  ? 'Current'
                                  : newSubscription.id === plan.id
                                  ? 'Selected'
                                  : 'Select'}
                              </Button>
                            </div>
                          )
                        )}
                    </Panel>

                    <Panel header="Annually" key="2">
                      {subscriptionPlans.annually &&
                        subscriptionPlans.annually[0].personal.map(
                          (plan, key) => (
                            <div key={key} className="subscription_plan">
                              <p className="plan-name">
                                Plan Name : {plan.title}
                              </p>
                              <p className="plan-price">
                                Price : £
                                {plan.price.toString().slice(-2) !== '00'
                                  ? (plan.price / 100).toFixed(2)
                                  : plan.price / 100}
                              </p>
                              <Button
                                type="primary"
                                size="small"
                                className={
                                  newSubscription.id === plan.id
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() => updatePlan(plan, 'Annually')}
                                disabled={
                                  subscription.plan_details.id === plan.id
                                    ? true
                                    : false
                                }
                              >
                                {subscription.plan_details.id === plan.id
                                  ? 'Current'
                                  : newSubscription.id === plan.id
                                  ? 'Selected'
                                  : 'Select'}
                              </Button>
                            </div>
                          )
                        )}
                    </Panel>
                  </Collapse>
                )}
                {subscription.plan_details.subscription_tier === 'Family' && (
                  <Collapse>
                    <Panel header="Monthly" key="1">
                      {subscriptionPlans.monthly &&
                        subscriptionPlans.monthly[0].family.map((plan, key) => (
                          <div key={key} className="subscription_plan">
                            <p className="plan-name">
                              Plan Name : {plan.title}
                            </p>
                            <p className="plan-price">
                              Price : £
                              {plan.price.toString().slice(-2) !== '00'
                                ? (plan.price / 100).toFixed(2)
                                : plan.price / 100}
                            </p>
                            <Button
                              type="primary"
                              size="small"
                              className={
                                newSubscription.id === plan.id ? 'selected' : ''
                              }
                              onClick={() => updatePlan(plan, 'Monthly')}
                              disabled={
                                subscription.plan_details.id === plan.id
                                  ? true
                                  : false
                              }
                            >
                              {subscription.plan_details.id === plan.id
                                ? 'Current'
                                : newSubscription.id === plan.id
                                ? 'Selected'
                                : 'Select'}
                            </Button>
                          </div>
                        ))}
                    </Panel>
                    <Panel header="Annually" key="2">
                      {subscriptionPlans.annually &&
                        subscriptionPlans.annually[0].family.map(
                          (plan, key) => (
                            <div key={key} className="subscription_plan">
                              <p className="plan-name">
                                Plan Name : {plan.title}
                              </p>
                              <p className="plan-price">
                                Price : £
                                {plan.price.toString().slice(-2) !== '00'
                                  ? (plan.price / 100).toFixed(2)
                                  : plan.price / 100}
                              </p>
                              <Button
                                type="primary"
                                size="small"
                                className={
                                  newSubscription.id === plan.id
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() => updatePlan(plan, 'Annually')}
                                disabled={
                                  subscription.plan_details.id === plan.id
                                    ? true
                                    : false
                                }
                              >
                                {subscription.plan_details.id === plan.id
                                  ? 'Current'
                                  : newSubscription.id === plan.id
                                  ? 'Selected'
                                  : 'Select'}
                              </Button>
                            </div>
                          )
                        )}
                    </Panel>
                  </Collapse>
                )}
                {subscription.plan_details.subscription_tier === 'Business' && (
                  <Collapse>
                    <Panel header="Monthly" key="1">
                      {subscriptionPlans.monthly &&
                        subscriptionPlans.monthly[0].business.map(
                          (plan, key) => (
                            <div key={key} className="subscription_plan">
                              <p className="plan-name">
                                Plan Name : {plan.title}
                              </p>
                              <p className="plan-price">
                                Price : £
                                {plan.price.toString().slice(-2) !== '00'
                                  ? (plan.price / 100).toFixed(2)
                                  : plan.price / 100}
                              </p>
                              <Button
                                type="primary"
                                size="small"
                                className={
                                  newSubscription.id === plan.id
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() => updatePlan(plan, 'Monthly')}
                                disabled={
                                  subscription.plan_details.id === plan.id
                                    ? true
                                    : false
                                }
                              >
                                {subscription.plan_details.id === plan.id
                                  ? 'Current'
                                  : newSubscription.id === plan.id
                                  ? 'Selected'
                                  : 'Select'}
                              </Button>
                            </div>
                          )
                        )}
                    </Panel>
                    <Panel header="Annually" key="2">
                      {subscriptionPlans.annually &&
                        subscriptionPlans.annually[0].business.map(
                          (plan, key) => (
                            <div key={key} className="subscription_plan">
                              <p className="plan-name">
                                Plan Name : {plan.title}
                              </p>
                              <p className="plan-price">
                                Price : £
                                {plan.price.toString().slice(-2) !== '00'
                                  ? (plan.price / 100).toFixed(2)
                                  : plan.price / 100}
                              </p>
                              <Button
                                type="primary"
                                size="small"
                                className={
                                  newSubscription.id === plan.id
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() => updatePlan(plan, 'Annually')}
                                disabled={
                                  subscription.plan_details.id === plan.id
                                    ? true
                                    : false
                                }
                              >
                                {subscription.plan_details.id === plan.id
                                  ? 'Current'
                                  : newSubscription.id === plan.id
                                  ? 'Selected'
                                  : 'Select'}
                              </Button>
                            </div>
                          )
                        )}
                    </Panel>
                  </Collapse>
                )}

                <p className="subtotal">
                  Subtotal: £{calculatePrice().toFixed(2)}{' '}
                  {newSubscription
                    ? newPayFrequency
                    : subscription.plan_details.payment_frequency}
                </p>

                <div className="submit-container">
                  <Button
                    type="secondary"
                    block
                    size="large"
                    onClick={() => submitUpdatedSubscription()}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </Formik>
          </Modal>
        </div>
        <div className="section-footer">
          <p className="text-lighter" onClick={() => showCloseAccountModal()}>
            Close your account and cancel subscription payments
          </p>
          <Modal
            title="Confirm Delete"
            visible={modalCloseAccountVisible}
            onCancel={() => hideCloseAccountModal()}
            footer={null}
          >
            {' '}
            <label>Confirm Password</label>
            <Input
              name="password"
              type="password"
              size="large"
              className="confirm_password"
              onChange={e => setpassword(e.target.value)}
            />
            <Button
              type="secondary"
              className="submit-delete"
              onClick={() => submitDelete()}
            >
              Submit
            </Button>
          </Modal>
        </div>
      </div>
    )
  );
};

export default AccountSubscription;
