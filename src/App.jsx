import React, { useEffect, useState, useCallback } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    ProjectOutlined,
    ToolOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout, Menu, Button, theme, notification, Avatar } from 'antd';
import { getAuth } from "firebase/auth";


import Tasks from './pages/Tasks';
import Storage from './pages/Storage';
import Service from './pages/Service';
import Record from './pages/Record';
import Reports from './pages/Reports';
import Authentication from './components/Authentication/Authentication';
import UserModal from './components/UserModal/UserModal';
import CardModal from './components/CardModal/CardModal';

import './styles/app.sass';

import { showUserModal } from './store/userModalSlice';

import { useDispatch } from 'react-redux'

const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch()

    function getCookie() {
        return document.cookie.split('; ').reduce((acc, item) => {
            const [name, value] = item.split('=')
            acc[name] = value
            return acc
        }, {})
    }

    const checkAuthorized = () => {
        const cookie = getCookie();
        return cookie.authorized;
    }

    const [authorized, setAuthorized] = useState(checkAuthorized());

    const { token:
        { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const auth = getAuth();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description, placement) => {
        api[type]({
            message: message,
            description: description,
            placement: placement,
        });
    };
    const cachedOpenNotificationWithIcon = useCallback(openNotificationWithIcon, [api])

    useEffect(() => {
        authorized && cachedOpenNotificationWithIcon('success', 'Пользователь авторизирован', '', 'top');
    }, [authorized, cachedOpenNotificationWithIcon])

    return (
        <>
            {contextHolder}
            {!authorized && <Authentication auth={auth} onAuthorized={setAuthorized} openNotificationWithIcon={openNotificationWithIcon}></Authentication>}
            {authorized && <Layout className='app'>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <ProjectOutlined />,
                                label: <Link to="/tasks">Задачи</Link>,
                            },
                            {
                                key: '2',
                                icon: <HomeOutlined />,
                                label: <Link to="/storage">Склад</Link>,
                            },
                            {
                                key: '3',
                                icon: <ToolOutlined />,
                                label: <Link to="/service">Сервис</Link>,
                            },
                            {
                                key: '4',
                                label: <Link to="/record">Запись</Link>,
                            },
                            {
                                key: '5',
                                label: <Link to="/reports">Отчёты</Link>,
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        className='header'
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            className='header__btn header-btn'
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                        />
                        <div className="header__user header-user" onClick={() => dispatch(showUserModal())}>
                            <Avatar className='header__avatar header-avatar' shape="square" icon={<UserOutlined />} />
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<Tasks />} />
                            <Route path="/storage" element={<Storage />} />
                            <Route path="/service" element={<Service />} />
                            <Route path="/record" element={<Record />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
            }
            <CardModal>
                <div>
                    Card Modal
                </div>
            </CardModal>
            <UserModal>
                <div>
                    User Modal
                </div>
            </UserModal>
        </>
    );
};
export default App;