import React, { useEffect, useState } from 'react';
import Http from 'utils/Http';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import withAuth from 'components/AuthProvider';
import Subscriptions from 'components/Subscriptions';
import Head from 'next/head';

const Subscribe = () => {
    const [subscriptions, setsubscriptions] = useState('');
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        Http.get(`/subscription-plans`)
            .then(function (response) {
                setsubscriptions(response.data.data);
                setloading(false);
            })
            .catch(function (error) {
                console.log(error);
                setloading(false);
            });
    }, []);

    return (
        <>
            <Meta title='Subscribe' description='Subscribe' />
            <Head>
                <script
                    type='text/javascript'
                    src='https://maps.googleapis.com/maps/api/js?key=AIzaSyD0JkRGdgKkQRmcR99beXQPqS3xV6xIv9Q&libraries=places'
                ></script>
            </Head>
            <Header noHero={true} />
            <PageContainer>
                {subscriptions && (
                    <Subscriptions subscriptions={subscriptions} />
                )}
            </PageContainer>
            <Footer />
        </>
    );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(Subscribe, false);
