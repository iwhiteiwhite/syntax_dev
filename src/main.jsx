import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css'; // รีเซ็ต CSS Ant Design


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
