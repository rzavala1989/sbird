import React, { Fragment, useState } from 'react'
import { Row, Col, Typography, Form, Input, Button, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Logo } from '@assets/images/logo/ic-main-sendbird-logo-white.svg'
import { Loading } from '@components'
import { PRIMARY_COLOR } from '@constants'
import { useFirebase } from '@context'
import { FadeIn, SlideLeft } from '@animations'

const { Title, Text } = Typography

export default function Register() {
    const navigate = useNavigate()
    const { registerFB } = useFirebase()
    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)

    async function onFinish(values) {
        const { fullName, emailOrYourPhoneNumber, password } = values

        setLoading(true)
        try {
            const currentUser = await registerFB(
                fullName,
                emailOrYourPhoneNumber,
                password
            )
            // console.log(currentUser)

            if (currentUser) {
                notification['success']({
                    message: 'Register',
                    description: 'Register successfully!',
                    onClick: () => {
                        console.log('Notification Clicked!')
                    },
                    placement: 'bottomRight',
                })
            }
        } catch (error) {
            notification['error']({
                message: 'Login Error',
                description: error.message,
                onClick: () => {
                    console.log('Notification Clicked!')
                },
                placement: 'bottomRight',
            })
        }
        setLoading(false)
    }

    function onFinishFailed(errorInfo) {
        // console.log('Failed:', errorInfo)
    }

    function navigateLogin() {
        navigate('/')
    }

    return (
        <Fragment>
            <Loading spinning={loading}>
                <Row>
                    <Col
                        xs={24}
                        sm={{ span: 8, offset: 8 }}
                        md={{ span: 12, offset: 6 }}
                        lg={{ span: 8, offset: 8 }}
                        xl={{ span: 6, offset: 9 }}
                    >
                        <Row
                            style={{
                                height: 'calc(100vh - 100px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Row
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '10vh',
                                }}
                            >
                                <FadeIn>
                                    <Logo fill={PRIMARY_COLOR} />
                                </FadeIn>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Title level={2}>
                                    <SlideLeft>SendBird Messenger</SlideLeft>
                                </Title>
                            </Row>
                            <Row
                                style={{
                                    justifyContent: 'center',
                                    height: '5vh',
                                }}
                            >
                                <Text>
                                    {t('src.screens.register.WEONCPUTRY')}
                                </Text>
                            </Row>
                            <Form
                                style={{ padding: '0 5vw' }}
                                name="normal_login"
                                className="login-form"
                                // initialValues={{
                                // 	fullName: 'Tr???nh Chin Chin',
                                // 	emailOrYourPhoneNumber: 'trinhchinchin@gmail.com',
                                // 	password: '123456',
                                // }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    name="fullName"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your Fullname!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Fullname" />
                                </Form.Item>
                                <Form.Item
                                    name="emailOrYourPhoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your Email or Phone number!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email or your phone number" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Button type="link" htmlType="submit">
                                            {t('src.screens.register.CA')}
                                        </Button>
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    noStyle
                                >
                                    <div
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('src.screens.register.BCYAITYATT')}
                                        <a href="https://sendbird.com/support-policy">
                                            {t('src.screens.register.PP')}
                                        </a>
                                        {t('src.screens.register.And')}
                                        <a href="https://sendbird.com/support-policy">
                                            {t('src.screens.register.Terms')}
                                        </a>
                                    </div>
                                </Form.Item>
                            </Form>
                        </Row>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: 100,
                            }}
                        >
                            <Button onClick={navigateLogin} type="link">
                                {t('src.screens.register.LWS')}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Loading>
        </Fragment>
    )
}
