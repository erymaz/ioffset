import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Meta from 'components/Meta';
import { Typography } from 'antd';
import LoginForm from './LoginForm';
import { login } from 'store/auth';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import * as Yup from 'yup';

const Login = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const error = useSelector((state) => state.auth.error);

    const initialValues = {
        email: '',
        password: '',
    };

    const Schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = (values) => {
        dispatch(login(values));
    };

    return (
        <>
            <Meta title='Login' />
            <Header noHero={true} />
            {!isAuthenticated && (
                <div>
                    <div className='block login text-center'>
                        <Formik
                            onSubmit={handleSubmit}
                            validationSchema={Schema}
                            component={LoginForm}
                            initialValues={initialValues}
                        />
                        <Typography.Text type='danger'>{error}</Typography.Text>
                        <span>Don't have an account?</span>
                        <Link href='/subscribe'>
                            <a className='text-lighter sign-up'>Signup</a>
                        </Link>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Login;
