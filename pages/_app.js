import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import store from 'store';
import '../assets/styles/global.scss';

class AppContainer extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { ...pageProps };
    }

    render() {
        const { Component, store } = this.props;
        return (
            <Provider store={store}>
                <Component {...this.props} />
            </Provider>
        );
    }
}

export default withRedux(store)(AppContainer);
