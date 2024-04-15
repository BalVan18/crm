import { useEffect, useState, useCallback } from 'react';
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
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";

import './styles/app.sass';

import { showUserModal } from './store/userModalSlice';
import { setUserData } from './store/userSlice';
import { setEmployees, setTasks, setClients } from './store/bdSlice';

import {useDispatch, useSelector} from 'react-redux';
import {getDatabase, onValue, ref} from "firebase/database";

const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    
    const dispatch = useDispatch()
    const db = getDatabase();

    function getCookie() {
        return document.cookie.split('; ').reduce((acc, item) => {
            const [name, value] = item.split('=')
            acc[name] = value
            return acc
        }, {})
    }

    const [authorized, setAuthorized] = useState(getCookie().authorized);

    const employees = useSelector((state) => state.bd.employees)

    const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();

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

        const fetchEmployees = ref(db, 'employees/');
        onValue(fetchEmployees, (snapshot) => {
            if (snapshot.exists()){
                const data = snapshot.val();
                let employeesArr = [];
                for (let employee in data) {
                    employeesArr.push(data[employee])
                }
                dispatch(setEmployees(employeesArr))
            }
        });

        const fetchTasks = ref(db, 'tasks/');
        onValue(fetchTasks, (snapshot) => {
            if (snapshot.exists()){
                const data = snapshot.val();
                let tasksArr = [];
                for (let task in data) {
                    tasksArr.push(data[task])
                }
                dispatch(setTasks(tasksArr))
            }
        });

        const fetchClients = ref(db, 'clients/');
        onValue(fetchClients, (snapshot) => {
            if (snapshot.exists()){
                const data = snapshot.val();
                let clientsArr = [];
                for (let executor in data) {
                    clientsArr.push(data[executor])
                }
                dispatch(setClients(clientsArr))
            }
        });
    }, [authorized, cachedOpenNotificationWithIcon, db, dispatch])

    useEffect(() => {
        const user = employees.filter(employee => employee.email === getCookie().userEmail)[0];
        dispatch(setUserData(user));
    }, [employees, dispatch]);

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
            <CardModal />
            <UserModal />
            <NewTaskModal />
        </>
    );
};
export default App;