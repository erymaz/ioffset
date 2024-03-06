import React from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Button } from 'antd';
import * as Yup from 'yup';
import { AntPassword } from 'utils/createFields';
import { Formik, Form, Field } from 'formik';
import withAuth from 'components/AuthProvider';
import FooterHero from 'components/FooterHero';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Http from '../../utils/Http';
import './index.scss';

const Profile = () => {
    const {
        query: { token },
    } = useRouter();

    const passwordValidation = (values) => {
        values.password !== values.confirm_password
            ? toast.warning(
                  'Please make sure you have typed the same passwords'
              )
            : values.password.length < 8
            ? toast.warning('Please enter 8 characters')
            : submit(values);
    };

    const submit = (values) => {
        const postData = {
            token: token,
            password: values.password,
            confirm_password: values.password,
        };
        Http.post('/auth/password/reset/confirm', postData)
            .then(function (response) {
                toast.success('You have successfully changed password');
            })
            .catch(function (response) {
                response.data
                    ? toast.warning(response.data.data)
                    : toast.warning('Error submitting form, please try later');
            });
    };

    const Schema = Yup.object().shape({
        password: Yup.string().required('Required'),
        confirm_password: Yup.string().required('Required'),
    });

    return (
        <>
            <Meta title='Forgot Password' description='Forgot Password' />
            <PageContainer>
                <Header noHero={true} />
                <div className='forgot-password'>
                    <Formik
                        initialValues={{
                            password: '',
                            confirm_password: '',
                        }}
                        validationSchema={Schema}
                        onSubmit={(values) => {
                            passwordValidation(values);
                        }}
                    >
                        <Form
                            className='form-container'
                            style={{ marginBottom: 20 }}
                            className='form'
                        >
                            <p className='section-title'>Enter New Password</p>
                            <Field
                                component={AntPassword}
                                name='password'
                                type='password'
                                size='large'
                                placeholder='Password'
                                hasFeedback
                            />
                            <Field
                                component={AntPassword}
                                name='confirm_password'
                                type='password'
                                size='large'
                                placeholder='Confirm Password'
                                hasFeedback
                            />
                            <div className='submit-container'>
                                <Button
                                    type='secondary'
                                    htmlType='submit'
                                    block
                                    size='large'
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <FooterHero />
                <Footer />
            </PageContainer>
        </>
    );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(Profile, false);
