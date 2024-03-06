import React, { useState, useEffect } from 'react';
import { Button, Input, Modal } from 'antd';
import { email } from 'utils/validate';
import { Formik, Form, Field } from 'formik';
import { AntInput, AntPassword } from 'utils/createFields';
import Router from 'next/router';
import Loader from 'components/Loader';
import './index.scss';
import Http from '../../utils/Http';
import { toast } from 'react-toastify';

const AccountProfile = () => {
  const [profile, setprofile] = useState('');
  const [loading, setloading] = useState(false);
  const [password, setpassword] = useState('');
  const [validation, setvalidation] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);

  const updateProfileDetails = () => {
    setloading(true);
    Http.get('/dashboard/profile-details')
      .then(function (response) {
        setprofile(response.data.data);
        setloading(false);
      })
      .catch(function (response) {
        setloading(false);
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error, please try later');
      });
  };
  useEffect(() => {
    updateProfileDetails();
  }, []);

  const handleProfileSubmit = values => {
    setloading(true);
    setvalidation('');
    values.user.private_profile = profile.private_profile;
    values.user.marketing_consent = profile.marketing_consent;
    Http.put('/dashboard/profile-details', values)
      .then(function (response) {
        setloading(false);
        updateProfileDetails();
        toast.success(response.data.data);
      })
      .catch(function (response) {
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error submitting form, please try later');
        setloading(false);
      });
  };

  const profileValidation = values => {
    email(values.user.email) !== undefined
      ? setvalidation('Invalid email address')
      : handleProfileSubmit(values);
  };

  const handlePasswordSubmit = values => {
    setloading(true);
    setvalidation('');
    Http.put('/dashboard/update-password', values)
      .then(function (response) {
        setloading(false);
        toast.success(response.data.data);
      })
      .catch(function (response) {
        setloading(false);
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error submitting form, please try later');
      });
  };

  const passwordValidation = values => {
    values.password.confirmation_password !== values.password.new_password
      ? toast.warning('Please make sure you have typed the same passwords')
      : handlePasswordSubmit(values);
  };

  const submitDelete = () => {
    setloading(true);
    Http.delete('/dashboard/delete-account', {
      data: {
        id: profile.id,
        password: password,
      },
    })
      .then(function (response) {
        setmodalVisible(false);
        setloading(false);
        toast.success(response.data.data);
      })
      .catch(function (response) {
        setmodalVisible(false);
        setloading(false);
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error submitting form, please try later');
      });
  };

  const showModal = () => {
    setmodalVisible(true);
  };

  const handleCancel = e => {
    setmodalVisible(false);
  };

  const updatePrivate = () => {
    const newProfile = { ...profile };
    newProfile.private_profile = !newProfile.private_profile;
    setprofile(newProfile);
  };
  const updateConsent = () => {
    const newProfile = { ...profile };
    newProfile.marketing_consent = !newProfile.marketing_consent;
    setprofile(newProfile);
  };
  return loading ? (
    <Loader />
  ) : (
    profile && (
      <div className="profile-container">
        <div className="profile">
          <h1 className="title">Your iOffset Profile</h1>
          <Formik
            initialValues={{
              user: {
                username: profile.user.username,
                first_name: profile.user.first_name,
                last_name: profile.user.last_name,
                email: profile.user.email,
                private_profile: profile.private_profile === 1 ? true : false,
                marketing_consent: profile.marketing_consent,
              },
              address: {
                address_line_1: profile.address.address_line_one,
                address_line_2: profile.address.address_line_two,
                city: profile.address.city,
                county: profile.address.country.name,
                postcode: profile.address.postcode,
              },
            }}
            onSubmit={values => {
              profileValidation(values);
            }}
          >
            <Form
              className="form-container"
              style={{ marginBottom: 20 }}
              className=""
            >
              <p className="profile-form-header">Profile Details</p>
              <p className="mandatory-field">* Mandatory Fields</p>
              <div className="ant-col ant-form-item-label">
                <label title="Country">Username</label>
              </div>
              <p className="disabled-input text-primary-opacity-50">
                {profile.user.username}
              </p>
              <p className="subtext">
                This will be used in your personal web page eg.
                ioffset.co.uk/greta
              </p>
              <Field
                component={AntInput}
                name="user.first_name"
                type="text"
                size="large"
                label="First Name"
                required
                hasFeedback
              />
              <Field
                component={AntInput}
                name="user.last_name"
                type="text"
                size="large"
                label="Last Name"
                required
                hasFeedback
              />
              <Field
                component={AntInput}
                name="user.email"
                type="text"
                size="large"
                label="Email address"
                required
                hasFeedback
              />
              <Field
                component={AntInput}
                name="address.address_line_1"
                type="text"
                size="large"
                label="Address line 1"
                required
                hasFeedback
              />
              <Field
                component={AntInput}
                name="address.address_line_2"
                type="text"
                size="large"
                label="Address line 2"
                className="notMandatory"
                hasFeedback
              />
              <Field
                component={AntInput}
                name="address.city"
                type="text"
                size="large"
                label="City"
                required
                hasFeedback
              />
              <div className="ant-col ant-form-item-label">
                <label title="Country">Country</label>
              </div>
              <p className="disabled-input text-primary-opacity-50">
                {profile.address.country.name}
              </p>
              <Field
                component={AntInput}
                name="address.postcode"
                type="text"
                size="large"
                label="Postcode"
                required
                hasFeedback
              />
              <label className="private_checkbox">
                <input
                  type="checkbox"
                  checked={profile.private_profile}
                  onChange={() => updatePrivate()}
                />
                <span>Make my profile private</span>
              </label>
              <p className="private_text text-primary-opacity-50">
                Private profiles will not be visible to the public. We encourage
                you to keep your profile public though, so as many people as
                possible can be inspired by your contribution.
              </p>
              <label className="marketing_checkbox">
                <input
                  type="checkbox"
                  checked={profile.marketing_consent}
                  onChange={() => updateConsent()}
                />
                <span>
                  By checking this box, I agree I want to receive news, offers
                  and other marketing materials from iOffset, including by email
                  and mail to the contact information I am submitting. I consent
                  to iOffset, its affilates and service providers processing my
                  personal data for these purposes and as described in the{' '}
                  <a onClick={() => Router.push('/privacy-policy')}>
                    privacy policy
                  </a>
                  . I understand that I can withdraw my consent at any time.
                </span>
              </label>
              <div className="submit-container">
                <Button type="secondary" htmlType="submit" block size="large">
                  Save
                </Button>
                <p className="error">{validation}</p>
              </div>
            </Form>
          </Formik>
          <Formik
            initialValues={{
              password: {
                new_password: '',
                confirmation_password: '',
                current_password: '',
              },
            }}
            onSubmit={values => {
              passwordValidation(values);
            }}
          >
            <Form
              className="form-container"
              style={{ marginBottom: 20, marginTop: 40 }}
              className=""
            >
              <p className="profile-form-header">Change Your Password</p>
              <Field
                component={AntPassword}
                name="password.current_password"
                type="text"
                size="large"
                label="Current Password"
                required
                hasFeedback
              />
              <Field
                component={AntPassword}
                name="password.new_password"
                type="text"
                size="large"
                label="New Password"
                required
                hasFeedback
              />
              <Field
                component={AntPassword}
                name="password.confirmation_password"
                type="text"
                size="large"
                label="Confirm Password"
                required
                hasFeedback
              />
              <div className="submit-container">
                <Button type="secondary" htmlType="submit" block size="large">
                  Save
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="section-footer">
          <p className="text-lighter" onClick={() => showModal()}>
            Close your account and cancel subscription payments
          </p>
          <Modal
            title="Confirm Delete"
            visible={modalVisible}
            onCancel={() => handleCancel()}
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

export default AccountProfile;
