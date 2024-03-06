import React from 'react';
import Component from 'containers/Home';
import axios from 'axios';
import withAuth from 'components/AuthProvider';
const Page = (props) => {
    return <Component {...props} />;
};

// Only required if you need data to render for SEO.
// Everything else can go into component state.

Page.getInitialProps = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const json = await res.data;
    return { posts: json };
};

export default Page;
