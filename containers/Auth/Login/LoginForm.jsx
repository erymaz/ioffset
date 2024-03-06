import React, { useState, useEffect } from 'react';
import { Form, Field } from 'formik';
import { Button, Modal, Input } from 'antd';
import { email } from 'utils/validate';
import { AntInput, AntPassword } from 'utils/createFields';
import Http from '../../../utils/Http';
import { toast } from 'react-toastify';

const LoginForm = ({ handleSubmit, values }) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [confirmemail, setconfirmemail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showModal = e => {
    e.preventDefault();
    setmodalVisible(true);
  };

  const handleCancel = e => {
    setmodalVisible(false);
  };

  const forgotPasswordSubmit = () => {
    const emailData = {
      email: confirmemail
    };
    email(confirmemail) !== undefined
      ? toast.warning('Invalid email address')
      : Http.post('/auth/password/reset/request', emailData)
          .then(function(response) {
            toast.success(response.data.data);
          })
          .catch(function(response) {
            response.data
              ? toast.warning(response.data.data)
              : toast.warning('Error submitting form, please try later');
          });
  };
  return (
    <>
      <Form
        className="form-container"
        onSubmit={handleSubmit}
        style={{ marginBottom: 20 }}
        className="form"
      >
        <p className="section-title">Please Sign In</p>
        <Field
          component={AntInput}
          name="email"
          type="email"
          size="large"
          placeholder="Email Address"
          hasFeedback
        />
        <Field
          component={AntPassword}
          name="password"
          type="password"
          size="large"
          placeholder="Password"
          hasFeedback
        />

        <div className="submit-container">
          <Button type="secondary" htmlType="submit" block size="large">
            Log in
          </Button>
        </div>
        <button
          onClick={e => showModal(e)}
          className="text-lighter forgot-password-text"
        >
          Forgot Password?
        </button>
      </Form>
      <Modal
        title="Forgot Password"
        visible={modalVisible}
        onCancel={() => handleCancel()}
        footer={null}
      >
        {' '}
        <label>Confirm Email</label>
        <Input
          name="email"
          type="text"
          size="large"
          className="email"
          onChange={e => setconfirmemail(e.target.value)}
        />
        <Button
          type="secondary"
          className="submit-forgotpassword"
          onClick={() => forgotPasswordSubmit()}
        >
          Submit
        </Button>
      </Modal>
    </>
  );
};

export default LoginForm;
