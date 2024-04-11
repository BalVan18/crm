import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from "firebase/auth";

import "./Authentication.sass"

const Authentication = ({ auth, onAuthorized, openNotificationWithIcon }) => {
    const onFinish = (values) => {
        signInWithEmailAndPassword(auth, values.username, values.password)
            .then(() => {
                onAuthorized(true);
                document.cookie = 'authorized=true;max-age=604800'
            })
            .catch(() => {
                openNotificationWithIcon('error', 'Ошибка авторизации', 'Введите правильный e-mail/пароль', 'top');
            });
    };

    return (
        <div className='auth'>
            <Form
                name="normal_login"
                className="auth__form auth-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введи ваш E-mail!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введи ваш пароль!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item className='form__btn form-btn'>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Authentication;