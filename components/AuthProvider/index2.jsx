import React, { Component } from 'react';
import Http from 'utils/Http';
import PageContainer from 'components/PageContainer';
import Cookie from 'js-cookie';
import redirect from 'utils/redirect';

function withAuth({ WrappedComponent, protected }) {
  return class Authenticated extends Component {
    state = {
      loading: true,
      isAuthenticated: false
    };

    static async getInitialProps(props) {
      const initialProps = {};
      const hasToken = Cookie.get('token');
      const auth = await Http.get('/admin-users/current', {
        headers: { Authorization: `Bearer ${hasToken}` }
      });
      console
        .log('index2')
        .then(res => {
          var _this = this;
          _this.setState({ loading: false, isAuthenticated: true });
        })
        .catch(() => {
          if (protected) {
            redirect(props.res, '/login');
          }
        });

      return initialProps;
    }

    render() {
      const { auth, ...propsWithoutAuth } = this.props;

      if (this.state.loading) {
        return <PageContainer loading />;
      } else {
        return (
          <WrappedComponent
            auth={this.state.isAuthenticated}
            {...propsWithoutAuth}
          />
        );
      }
    }
  };
}

export default withAuth;
