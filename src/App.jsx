import React, {useState} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import {Routes, Route, Navigate, Link} from 'react-router-dom';
import {Layout, Menu, Button, theme} from 'antd';


import Home from './pages/Home';
import Storage from './pages/Storage';
import Service from './pages/Service';
import Reports from './pages/Reports';

import './styles/app.sass';


const {Header, Sider, Content} = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <Layout className='app'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"/>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined/>,
              label: <Link to="/home">Задачи</Link>,
            },
            {
              key: '2',
              icon: <VideoCameraOutlined/>,
              label: <Link to="/storage">Склад</Link>,
            },
            {
              key: '3',
              icon: <UploadOutlined/>,
              label: <Link to="/service">Сервис</Link>,
            },
            {
              key: '4',
              icon: <UploadOutlined/>,
              label: <Link to="/reports">Отчёты</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
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
            <Route path="/" element={<Home/>}/>
            <Route path="/storage" element={<Storage/>}/>
            <Route path="/service" element={<Service/>}/>
            <Route path="/reports" element={<Reports/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;