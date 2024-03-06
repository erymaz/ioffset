import React, { useState, useEffect } from 'react';
import Http from 'utils/Http';
import Router, { useRouter } from 'next/router';
import Loader from 'components/Loader';
import './index.scss';

const EmailVerify = () => {
  const [emailresponse, setemailresponse] = useState({
    success: false,
    message: ''
  });
  const [loading, setloading] = useState(false);
  const {
    query: { token }
  } = useRouter();

  useEffect(() => {
    setloading(true);
    Http.get(`/auth/email-verification/${token}`)
      .then(function(response) {
        setemailresponse({
          success: true,
          message: response.data.data
        });
        setloading(false);
        setTimeout(() => {
          Router.push('/login');
        }, 5000);
      })
      .catch(function(error) {
        setloading(false);
        setemailresponse({
          success: false,
          message: 'There was a problem verifying your email'
        });
      });
  }, []);
  return loading ? (
    <div className="block verify">
      <Loader />
    </div>
  ) : (
    <div className="block verify">
      <p className="page-title">{emailresponse.message}</p>
      {emailresponse.success && (
        <p className="text-lighter">
          You will be redirected to the login screen
        </p>
      )}
    </div>
  );
};

export default EmailVerify;
