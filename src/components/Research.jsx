import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result, Input, Space, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Search } = Input;
import SERVER_API_URL from './config';

const Research = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSearch = async (value) => {
    const idplayer = value.trim();
    if (!idplayer) return;

    setLoading(true);

    try {
      const response = await fetch(`${SERVER_API_URL}/api/v1/Account/${idplayer}`);
      const text = await response.text();
      const trimmed = text.substring(1, text.length - 1);

      let decoded = trimmed;
      for (let i = 0; i < 5; i++) {
        decoded = atob(decoded);
      }

      const parsedData = JSON.parse(decoded);

      if (parsedData && parsedData.idplayer) {
        navigate(`/account/${parsedData.id}`);
      } else {
        messageApi.open({
          type: 'error',
          content: 'ไม่พบผู้ใช้บัญชีนี้.',
        });
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("เกิดข้อผิดพลาดในการค้นหา");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <Result
        status="success"
        title="View Account Activity"
        subTitle="Keep tabs on your Roblox farming progress."
        icon={<UserOutlined style={{ color: '#c6c6c6' }} />}
        style={{ maxWidth: 600, width: '100%' }}
        extra={
          <Space direction="vertical" style={{ width: '100%' }}>
            {contextHolder}
            <Search
              placeholder="Enter your Player ID"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              loading={loading}
              style={{color:"#36434f99"}}
            />
          </Space>
        }
      />
    </div>
  );
};

export default Research;
