import React from 'react';
import { Layout } from 'antd';
import Loader from 'components/Loader';
import './index.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CookieConsent from 'react-cookie-consent';

const PageContainer = props => {
  const { loading } = props;
  toast.configure();
  return (
    <Layout>
      <Layout.Content className="content-wrapper">
        {loading ? (
          <div
            style={{
              position: 'fixed',
              display: 'flex',
              width: '100vw',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              left: 0
            }}
          >
            <Loader />
          </div>
        ) : (
          props.children
        )}
      </Layout.Content>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </Layout>
  );
};

export default PageContainer;
