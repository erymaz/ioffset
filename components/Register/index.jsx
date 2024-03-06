import { Row, Col, Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { email } from 'utils/validate';
import Http from '../../utils/Http';
import StripePayment from '../StripePayment';
import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import moment from 'moment';
import Autocomplete from 'react-google-autocomplete';
import {
  AntInput,
  AntDatePicker,
  AntPassword,
  AntInputNumber,
} from 'utils/createFields';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import './index.scss';

const Register = props => {
  const [loading, setloading] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [user, setuser] = useState('');
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Initial form values
  const initialValues = {
    subscription: {
      plan_id: props.plan.id,
      additional_adults: '',
    },
    additional_adults: '',
    additional_children: '',
    user: {
      username: null,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      marketing_consent: false,
    },
    address: {
      address_line_1: '',
      address_line_2: '',
      county: '',
      city: '',
      postcode: '',
    },
  };

  const {
    query: { token },
  } = useRouter();

  const showModal = () => {
    setmodalVisible(true);
  };

  const handleCancel = e => {
    setmodalVisible(false);
  };

  //Form validation
  const validateForm = values => {
    values.user.marketing_consent = consent;
    values.additional_adults = values.additional_adults.toString();
    values.additional_children = values.additional_children.toString();
    values.user.password !== values.user.password_confirmation
      ? toast.warning('Please make sure you have typed the same passwords')
      : !/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(values.user.password)
      ? toast.warning(
          'Must contain a combination of letters and a minimum of one number'
        )
      : values.user.password.toString().length < 6
      ? toast.warning('Must be at least 6 characters')
      : email(values.user.email) !== undefined
      ? toast.warning('Invalid email address')
      : handleSubmit(values);
  };

  //Form Submition after validation
  const handleSubmit = values => {
    const registerLink = token ? `/auth/register/${token}` : '/auth/register';
    setloading(true);
    Http.post(registerLink, values)
      .then(function (response) {
        setuser(response.data);
        setloading(false);
        showModal(true);
      })
      .catch(function (response) {
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error submitting form, please try later');
        setloading(false);
      });
  };

  function disabledDate(current) {
    let customDate = moment().subtract(18, 'years');
    return current && current > moment(customDate, 'YYYY-MM-DD');
  }

  const Schema = Yup.object().shape({
    user: Yup.object().shape({
      username: Yup.string().required('Required'),
    }),
  });

  const form = () => (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={values => {
          validateForm(values);
        }}
        render={({ setFieldValue }) => (
          <Form
            className="form-container"
            style={{ marginBottom: 20 }}
            className="form"
          >
            <p className="page-title">Sign Up</p>
            <p className="text-lighter  text-center">
              You have selected{' '}
              <span className="selected_plan_name  text-center">
                {props.plan.plan} {props.plan.name}
              </span>
            </p>

            <Button
              type="primary"
              className="text-center"
              onClick={props.changeSubscription}
            >
              Select different subscription
            </Button>
            <div className="form-fields">
              {props.plan.plan === 'Family' && (
                <>
                  <p className="page-subtitle text-primary-opacity-50">
                    Additional Family Members
                  </p>
                  <Field
                    component={AntInputNumber}
                    name="additional_adults"
                    size="large"
                    placeholder="Adults"
                    required
                  />
                  <Field
                    component={AntInputNumber}
                    name="additional_children"
                    size="large"
                    placeholder="Children"
                    required
                  />
                </>
              )}
              <p className="page-subtitle text-primary-opacity-50">
                User details
              </p>
              <Field
                component={AntInput}
                name="user.first_name"
                type="text"
                size="large"
                placeholder="First name*"
                required
              />
              <Field
                component={AntInput}
                name="user.last_name"
                type="text"
                size="large"
                placeholder="Last name*"
                hasFeedback
                required
              />
              <Field
                component={AntInput}
                name="user.email"
                type="email"
                size="large"
                placeholder="Email*"
                hasFeedback
                required
              />
              <Field
                component={AntInput}
                name="user.username"
                type="text"
                size="large"
                placeholder="iOffset Username*"
                required
              />
              <Field
                component={AntPassword}
                name="user.password"
                type="password"
                size="large"
                placeholder="Password*"
                className="password"
                hasFeedback
                required
              />
              <Field
                component={AntPassword}
                name="user.password_confirmation"
                type="password"
                size="large"
                placeholder="Password Confirmation*"
                hasFeedback
                required
              />
              <p className="page-subtitle text-primary-opacity-50">
                Address details
              </p>
              <Autocomplete
                onPlaceSelected={place => {
                  place.address_components.map(component => {
                    component.types.includes('street_number') &&
                      setFieldValue(
                        'address.address_line_1',
                        component.short_name
                      );
                    component.types.includes('route') &&
                      setFieldValue(
                        'address.address_line_2',
                        component.short_name
                      );
                    component.types.includes('postal_town') &&
                      setFieldValue('address.city', component.short_name);
                    component.types.includes('postal_code') &&
                      setFieldValue('address.postcode', component.short_name);
                  });
                }}
                types={['geocode']}
                componentRestrictions={{ country: 'uk' }}
                placeholder="Start typing your address..."
                className="google-places"
              />
              <Field
                component={AntInput}
                name="address.address_line_1"
                type="text"
                size="large"
                placeholder="House Name or Number*"
                hasFeedback
                required
              />
              <Field
                component={AntInput}
                name="address.address_line_2"
                type="text"
                size="large"
                placeholder="Street Name*"
                hasFeedback
                required
              />
              <Field
                component={AntInput}
                name="address.city"
                type="text"
                size="large"
                placeholder="City/Town*"
                hasFeedback
                required
              />
              <Field
                component={AntInput}
                name="address.county"
                type="text"
                size="large"
                placeholder="County"
                hasFeedback
              />
              <Field
                component={AntInput}
                name="address.postcode"
                type="text"
                size="large"
                placeholder="Postcode*"
                hasFeedback
                required
              />
            </div>

            <label for="consent" className="consent-checkbox">
              <input
                type="checkbox"
                id="consent"
                value={consent}
                onChange={() => setConsent(!consent)}
              />
              <span>
                Yes, sign me up! By checking this box, I agree I want to receive
                news, offers and other marketing materials from iOffset,
                including by email and mail to the contact information I am
                submitting. I consent to iOffset, its affilates and service
                providers processing my personal data for these purposes and as
                described in the{' '}
                <a onClick={() => Router.push('/privacy-policy')}>
                  privacy policy
                </a>
                . I understand that I can withdraw my consent at any time.
              </span>
            </label>
            <p className="text-center">
              By signing up, you agree to our terms of service and privacy
              policy.
            </p>
            <div className="submit-container">
              <Button
                type="secondary"
                htmlType="submit"
                block
                loading={loading}
                size="large"
              >
                Register
              </Button>
            </div>
          </Form>
        )}
      />
    </div>
  );

  return (
    <Row type="flex" justify="center">
      <Col span={24} lg={{ span: 16 }}>
        <div className="registeration">
          {form()}
          <Modal
            title="Payment Details"
            visible={modalVisible}
            onCancel={() => handleCancel()}
            footer={null}
          >
            <StripePayment
              user={user.success && user.success.token}
              price={props.plan.price}
              userDetails={user.user}
              notAccountPage={true}
            />
          </Modal>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
