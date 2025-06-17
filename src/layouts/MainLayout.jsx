/* eslint-disable no-unused-vars */
import React, { useState, useEffect  } from 'react';
import { Link, useLocation , useNavigate } from 'react-router-dom';
import LogoSyntax from "../image/LogoSyntax.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  CompassOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
  FacebookOutlined,
  NodeExpandOutlined,
  DiscordOutlined
} from '@ant-design/icons';
import { Divider , Button, Layout, Menu, Drawer, Grid, theme } from 'antd';
import './MainLayout.css'; 

const { Header, Footer, Content } = Layout;
const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/account',
      icon: <UserOutlined />,
      label: <Link to="/account">Account</Link>,
    },
    {
      type: 'divider',
      style: {
        width: '60%',
        margin: '16px auto',
      },
    },
    {
      key: 'mte',
      icon: <NodeExpandOutlined />,
      label: (
        <a href="http://mte-escrow.com" target="_blank" rel="noopener noreferrer">
          MTE-ESCROW
        </a>
      ),
    },
  ];

  
  const socialItems = [
    {
      key: 'facebook',
      icon: <FacebookOutlined />,
      label: (
        <a href="https://www.facebook.com/SyntaxRobuxshop" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
      ),
    },
    {
      key: 'discord',
      icon: <DiscordOutlined />,
      label: (
        <a href="https://discord.gg/6HXjsPhwtw" target="_blank" rel="noopener noreferrer">
          Discord
        </a>
      ),
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="main-layout">
      <div className="ant-blur-gradient"></div>
      <Layout style={{ minHeight: '100vh'}}>
        {!isMobile && (
          <Layout.Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          style={{
            background: 'rgb(4 4 8)',
            // overflow: 'hidden',
            borderRight: '1px solid rgb(194 193 193 / 12%)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            padding: '10px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <div>
              <div
                className="demo-logo-vertical"
                style={{
                  height: 64,
                  margin: 16,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                  cursor: 'pointer',
                }}
                onClick={handleLogoClick}
              >
                <img
                  src={LogoSyntax}
                  alt="Logo"
                  style={{
                    width: 120,
                    height: 48,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>
        
              <Menu
                selectedKeys={[location.pathname]}
                style={{ background: 'rgb(4 4 8)' }}
                theme="dark"
                defaultSelectedKeys={['1']}
                items={menuItems}
              />
            </div>
        
            <div style={{ marginTop: 'auto' }}>
              <Menu
                theme="dark"
                mode="inline"
                items={socialItems}
                style={{
                  background: 'transparent',
                  borderRight: 0,
                }}
              />
            </div>
          </div>
        </Layout.Sider>
        )}
        {isMobile && (
          <Drawer
            title="เมนู"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            styles={{ body: { padding: 0 } }}
          >
            <Menu
              selectedKeys={[location.pathname]}
              style={{ background: 'rgb(5 5 5 / 0%)' }}
              defaultSelectedKeys={['1']}
              items={menuItems}
            />

            <Menu
              theme="dark"
              mode="inline"
              items={socialItems}
              style={{
                background: 'transparent',
                borderRight: 0,
              }}
            />
          </Drawer>
        )}

        <Layout
          style={{
            marginLeft: !isMobile ? (collapsed ? 50 : 220) : 0,
            transition: 'margin-left 0.2s',
          }}
        >
          <Header
            style={{
              background: '#0000007d',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgb(83 79 79 / 23%)',
              padding: '0 16px',
            }}
          >
            {isMobile ? (
              <div
                className="logo-wrapper-mobile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 64,
                  marginLeft: 0,
                  cursor: 'pointer',
                }}
                onClick={handleLogoClick}
              >
                <img
                  src={LogoSyntax}
                  alt="Logo"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <span
                  style={{
                    marginLeft: 10,
                    background: 'linear-gradient(90deg, rgb(189, 215, 224), rgb(98, 94, 174), rgb(255, 255, 255)) text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: 22,
                    animation: 'glowCycle 4s ease-in-out infinite',
                    
                  }}
                  
                >
                  SYNTAXSHOP
                </span>
              </div>
            ) : (
              <h2
                style={{
                  margin: 30,
                  background: 'linear-gradient(90deg, rgb(189, 215, 224), rgb(98, 94, 174), rgb(255, 255, 255)) text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  animation: 'glowCycle 4s ease-in-out infinite',
                  cursor: 'pointer',
                }}
                onClick={handleLogoClick}
              >
                SYNTAXSHOP
              </h2>
            )}

            {isMobile && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setDrawerVisible(true)}
                style={{ color: 'white', fontSize: '20px' }}
              />
            )}
          </Header>

          <Content
            style={{
              padding: 5,
              background: 'rgba(0,0,0,0.7)',
              borderRadius: 0,
            }}
          >
            {children}
          </Content>
          

          <Footer
            style={{
              textAlign: 'center',
              background: '#000000bd',
              borderTop: '1px solid rgb(83 79 79 / 23%)',
            }}
          >
            SYNTAXSHOP ©{new Date().getFullYear()} Created by Syntax
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
