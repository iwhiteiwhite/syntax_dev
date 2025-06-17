/* eslint-disable no-unused-vars */
import React, { Fragment , useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Flex, Divider , Card, Col, Row, Statistic , Grid  , Tag , message , Spin } from 'antd'
import { 
  ShareAltOutlined , 
  EyeOutlined,RetweetOutlined , 
  ExclamationCircleOutlined, 
  DiscordOutlined ,
  LineChartOutlined , 
  ClockCircleOutlined, 
  FileTextOutlined, 
  SyncOutlined , 
  MergeCellsOutlined, 
  AliwangwangOutlined ,
  UserOutlined, 
  ShoppingOutlined , 
  DesktopOutlined , 
  FacebookOutlined 
} from '@ant-design/icons'; 

import syntax_pass from "../image/syntax_pass.png";
import syntax_gems from "../image/syntax_gems.png";
import syntax_gold from "../image/syntax_gold.png";
import axios from 'axios';
import moment from 'moment';
const { useBreakpoint } = Grid;
import SERVER_API_URL from './config';

const Dashboard = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isLarge = screens.xs ||screens.sm || screens.md || screens.lg || screens.xl || screens.xxl;
  const [userData, setUserData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [finishCount, setfinishCount] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  

  const openDate = moment('2023-01-02');
  const today = moment();
  const years = today.diff(openDate, 'years');
  openDate.add(years, 'years');
  const months = today.diff(openDate, 'months');
  openDate.add(months, 'months');

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  };
  function decodeBase64Utf8(encoded) {
    const binary = atob(encoded);
    const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0)));
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  }

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [listRes, finishRes, userfarmRes, accountRes] = await Promise.all([
          axios.get(`${SERVER_API_URL}/api/v1/topup/history`, { responseType: 'text' }),
          axios.get(`${SERVER_API_URL}/api/v1/game/history/finish`),
          axios.get(`${SERVER_API_URL}/api/v1/game/users`),
          fetch(`${SERVER_API_URL}/api/v1/game/data/accounts`),
        ]);
  
        const decodeBase64 = (data) => {
          let cleaned = data.substring(1, data.length - 1);
          for (let i = 0; i < 5; i++) {
            cleaned = decodeBase64Utf8(cleaned);
          }
          return JSON.parse(cleaned);
        }
  
        const parsedList = decodeBase64(listRes.data);
        const parsedData = decodeBase64(await accountRes.text());
  
        setDataList(parsedList);
        setfinishCount(finishRes.data);
        setUserList(userfarmRes.data);
        setUserData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAll();
  
    const handler = () => {
      fetchAll();
    };
    window.addEventListener('refresh-data', handler);
    return () => {
      window.removeEventListener('refresh-data', handler);
    };
  }, []);

  
  // const { onlineCount, offlineCount } = useMemo(() => {
  //   const now = new Date();
  //   let offline = 0;
  
  //   userData.forEach(user => {
  //     if (!user.updated_at) return;
  //     const updatedTime = new Date(user.updated_at);
  //     const diff = (now.getTime() - updatedTime.getTime()) / (1000 * 60);
  //     if (diff > 20) offline++;
  //   });
  
  //   return {
  //     offlineCount: offline,
  //     onlineCount: userData.length - offline,
  //   };
  // }, [userData]); 

  const totalCount = dataList.length + (finishCount?.farmfinish || 0);
  const handleCopy = () => {
    navigator.clipboard.writeText('https://discord.gg/6HXjsPhwtw').then(() => {
      messageApi.open({
        type: 'success',
        content: 'Copy a success discord.gg/syntaxshop',
      });
    }).catch(() => {
      messageApi.open({
        type: 'error',
        content: 'Copy is an error cant.',
      });
    });
  };

  const handleCopyfacebook = () => {
    navigator.clipboard.writeText('https://www.facebook.com/SyntaxRobuxshop').then(() => {
      messageApi.open({
        type: 'success',
        content: 'Copy a success https://www.facebook.com/SyntaxRobuxshop',
      });
    }).catch(() => {
      messageApi.open({
        type: 'error',
        content: 'Copy is an error cant.',
      });
    });
  };

  const defualtImage = "https://tr.rbxcdn.com/30DAY-AvatarBust-30123732AF8954BD0CBCE2CA5962A14A-Png/420/420/AvatarBust/Png/noFilter"

  function maskUsername(username) {
    if (typeof username !== 'string' || username.length < 4) return '****';
  
    const firstTwo = username.slice(0, 2);
    const lastTwo = username.slice(-2);
    return `${firstTwo}****${lastTwo}`;
  }

  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Fragment>
      <div style={{ marginTop: 10,}}></div>
      <Row
        justify="space-between"
        gutter={[10, 15]}
        style={{
          width: "100%",
          maxWidth: '96%',
          margin: "0px auto",
        }}>

        <Col xs={24} lg={20}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.05)',
                  color: '#fff',
                  animation: 'fadeInUp 0.5s ease forwards',
                }}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <div style={{ fontWeight: 'bold' , color: 'rgb(166 210 233)', fontSize: 14 }}>
                      Farming Account
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 'bold', color: '#33ccff' }}>
                      {userData.length}
                      {/* {userData.length}  <span 
                          style={{ 
                          background: 'linear-gradient(90deg, rgb(92 150 170 / 60%), rgb(31 211 247), rgb(64 155 221)) text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: 13,
                        }}>
                          {onlineCount}</span> <span style={{color: '#8a8a8a' , fontSize: 12}}>Online &nbsp;|&nbsp;</span> <span 
                          style={{ 
                          background: 'linear-gradient(90deg, rgb(92 150 170 / 60%), rgb(31 211 247), rgb(64 155 221)) text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: 13,
                        }}>
                          {offlineCount}</span> <span style={{color: '#8a8a8a' , fontSize: 12}}>Offline</span> */}
                    </div>
                    <div style={{ fontSize: 14, marginTop: 4 }}>
                          
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={{
                        background: '#0d3a4a',
                        borderRadius: '50%',
                        padding: 12,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <DesktopOutlined style={{ fontSize: 24, color: '#33ccff' }} />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.05)',
                  color: '#fff',
                  animation: 'fadeInUp 0.5s ease forwards',
                }}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <div style={{ fontWeight: 'bold' ,  color: 'rgb(166 210 233)', fontSize: 14 }}>
                      Completed Farming
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 'bold', color: '#33ccff' }}>
                      {finishCount.farmfinish}
                    </div>
                    <div style={{ fontSize: 14, marginTop: 4 }}>
                      {/* <span 
                          style={{ 
                          background: 'linear-gradient(90deg, rgb(92 150 170 / 60%), rgb(31 211 247), rgb(64 155 221)) text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: 13,
                        }}>
                          // +8</span> <span style={{color: '#8a8a8a' , fontSize: 12}}>new this month</span>  */}
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={{
                        background: '#0d3a4a',
                        borderRadius: '50%',
                        padding: 12,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MergeCellsOutlined style={{ fontSize: 24, color: '#33ccff' }} />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.05)',
                  color: '#fff',
                  animation: 'fadeInUp 0.5s ease forwards',
                }}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <div style={{ fontWeight: 'bold' ,  color: 'rgb(166 210 233)', fontSize: 14 }}>
                      Total Accounts
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 'bold', color: '#33ccff' }}>
                      {(totalCount + 862)}
                    </div>
                    <div style={{ fontSize: 14, marginTop: 4 }}>
                      {/* <span 
                          style={{ 
                          background: 'linear-gradient(90deg, rgb(92 150 170 / 60%), rgb(31 211 247), rgb(64 155 221)) text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: 13,
                        }}>
                          +25</span> <span style={{color: '#8a8a8a' , fontSize: 12}}>new this month</span> */}
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={{
                        background: '#0d3a4a',
                        borderRadius: '50%',
                        padding: 12,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AliwangwangOutlined style={{ fontSize: 24, color: '#33ccff' }} />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24}>
              <Card
                title={
                  <Row justify="space-between" align="middle">
                  <Col>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <LineChartOutlined style={{ color: '#00ffff', fontSize: 18 }} />
                      <span style={{ fontWeight: 'bold', fontSize: 16 }}>Account Dashboard</span>
                    </div>
                  </Col>
                  <Col>
                  <Tag color="#00bfa5" style={{ backgroundColor: "rgb(51 204 255 / 32%)" , borderRadius: 16, padding: '2px 12px' }}>
                    <span
                      style={{
                        color: '#fff',
                        marginRight: 3,
                        fontSize:14,
                        animation: 'blink 4s infinite',
                      }}
                    >
                      ●
                    </span>
                    <span style={{ color: '#fff' }}>Active Farming</span>
                  </Tag>
                  </Col>
                </Row>
                }
                style={{
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(100, 116, 139, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  color: '#d1d5db',
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease forwards',
                }}
              >
                
                <Row gutter={[16, 16]} justify="start" wrap>
                  {userData.map((item, index) => (
                    <Col key={index} className="responsive-col">

                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '2px 8px',
                        zIndex: 1,
                        flexWrap: 'wrap'
                      }}
                    >
                      {item.farm_story && (
                        <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="purple">
                          Story
                        </Tag>
                      )}
                      {item.farm_gem && (
                        <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="purple">
                          Gems
                        </Tag>
                      )}
                      {item.farm_challenge && (
                        <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="purple">
                          Challenge
                        </Tag>
                      )}
                      {item.farm_zcity && (
                        <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="purple">
                          Z City
                        </Tag>
                      )}
                      {item.farm_portalMode && (
                        <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="magenta">
                          Portal
                        </Tag>
                      )}
                      {item.farm_bossEvent && (
                        <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="red">
                          BOSS
                        </Tag>
                      )}
                      {item.farm_madara && (
                        <Tag style={{ backgroundColor: '#1a132529', color: '#15fff8' }} icon={<ExclamationCircleOutlined />} color="red">
                          Madara
                        </Tag>
                      )}

                      {item.farm_goku && (
                        <Tag style={{ backgroundColor: '#1a132529', color: '#15fff8' }} icon={<ExclamationCircleOutlined />} color="red">
                          Goku
                        </Tag>
                      )}

                      {item.farm_geto && (
                        <Tag style={{ backgroundColor: '#1a132529', color: '#15fff8' }} icon={<ExclamationCircleOutlined />} color="red">
                          Geto
                        </Tag>
                      )}
                      {item.farm_rangex && (
                        <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="volcano">
                          Ranger
                        </Tag>
                      )}
                      {item.farm_secertMode && (
                        <Tag  style={{backgroundColor:('#1a132529') , color:'#39e89f' }} icon={<ExclamationCircleOutlined />} color="red">
                          Secert
                        </Tag>
                      )}
                    </div>
                    <Card
                      onClick={() => navigate(`/account/${item.id}`)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 12,
                        color: '#fff',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                      }}
                      className="hover-card"
                    >
                      {isLarge && (
                        <Row justify="center" align="middle">
                          <Col span={24}>
                            <div
                              style={{
                                width: 80,
                                height: 80,
                                background: '#0d3a4a',
                                borderRadius: '50%',
                                margin: '0 auto 16px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <img
                                src={item.imgurlprofile === "" ? defualtImage : item.imgurlprofile}
                                alt="icon"
                                style={{ width: 90, height: 90, display: 'block' }}
                              />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ color: '#66ccff' }}>{maskUsername(item.idplayer)}</div>
                              <div
                                style={{
                                  backgroundColor: 'rgb(18 21 25 / 64%)',
                                  borderRadius: 12,
                                  padding: '10px 12px',
                                  marginTop: 8,
                                  marginBottom: 8,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                }}
                              >
                              {(() => {
                                const currentTime = Math.floor(Date.now() / 1000);
                                const endTime = item.endTime;
                                const remaining = endTime - currentTime;
                                const hours = Math.floor(remaining / 3600);
                                const minutes = Math.floor((remaining % 3600) / 60);
                                const seconds = Math.max(0, remaining % 60);

                                const now = new Date();
                                const nowMs = Date.now();
                                const nowUnix = Math.floor(nowMs / 1000);
                                const input = item.startTime || '';

                                const [dayRaw, monthRaw, yearRaw, timeRaw] = input.split(':');
                                const day = parseInt(dayRaw) || now.getDate();
                                const month = parseInt(monthRaw) || (now.getMonth() + 1);
                                const year = parseInt(yearRaw) || now.getFullYear();

                                let hour = now.getHours();
                                let minute = now.getMinutes();
                                let second = now.getSeconds();

                                if (timeRaw) {
                                  const [h, m, s] = timeRaw.split('.');
                                  hour = parseInt(h) || hour;
                                  minute = parseInt(m) || minute;
                                  second = parseInt(s) || second;
                                }

                                const date = new Date(
                                  parseInt(year),
                                  parseInt(month) - 1,
                                  parseInt(day),
                                  parseInt(hour),
                                  parseInt(minute),
                                  parseInt(second)
                                );

                                const timestamp = date.getTime();
                                const unixTimestamp = Math.floor(timestamp / 1000);
                                const percent = ((nowUnix - unixTimestamp) / (endTime - unixTimestamp)) * 100;
                                const percentInt = Math.floor(percent);
                                const displayPercent = percentInt < 0 ? 100 : percentInt;

                                const updatedTime = new Date(item.update_at);
                                const diffInMinutes = (now.getTime() - updatedTime.getTime()) / (1000 * 60);
                                return (
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      width: '100%',
                                      marginBottom: 4,
                                    }}
                                  >
                                    <div
                                      style={{
                                        gap: 8,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        width: '100%',
                                      }}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div
                                          style={{
                                            background: '#0d3a4a',
                                            borderRadius: '25%',
                                            padding: 4,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <RetweetOutlined  style={{ color: '#66ccff' }} />
                                        </div>
                                          <span style={{ color: '#66ccff', fontSize: 14 }}>
                                            {diffInMinutes > 20 ? '-' : item.resual}
                                          </span>
                                      </div>

                                      {remaining > 0 ? (
                                        diffInMinutes > 20 ? (
                                          <Tag style={{ margin: 0 , background:"#1d1d1d30" }} icon={<ExclamationCircleOutlined />} color="default">
                                            Offline
                                          </Tag>
                                        ) : item.resual === 'Lobbie' ? (
                                          <Tag style={{ margin: 0 }} icon={<ExclamationCircleOutlined />} color="blue">
                                            Waiting
                                          </Tag>
                                        ) : item.resual === 'in-Game' ? (
                                          <Tag style={{ margin: 0 }} icon={<SyncOutlined spin />} color="cyan">
                                            Farming
                                          </Tag>
                                        ) : null
                                      ) : (
                                        <Tag style={{ margin: 0 }} color="red">
                                          Ended
                                        </Tag>
                                      )}
                                    </div>

                                    <div style={{ 
                                      display: 'flex', 
                                      justifyContent: 'space-between', 
                                      color: 'rgb(143 210 238 / 68%)', 
                                      fontSize: 14, 
                                      marginTop: 4, 
                                      marginBottom: 6 
                                    }}>
                                      <div style={{ textAlign: 'left' }}>
                                        {remaining > 0 ? `${hours}h ${minutes}m ${seconds}s` : '0h 0m 0s'}
                                      </div>
                                      <div style={{ textAlign: 'right' }}>
                                        {`${Math.min(displayPercent, 100)}%`}
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        width: '100%',
                                        backgroundColor: '#1e293b',
                                        borderRadius: 10,
                                        height: 8,
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: `${Math.min(displayPercent, 100)}%`,
                                          background: 'linear-gradient(90deg, #00ffe7, #0099ff)',
                                          height: '100%',
                                          borderRadius: 10,
                                          transition: 'width 0.5s ease',
                                        }}
                                      />
                                    </div>
                                  </div>
                                );
                              })()}
                                
                              </div>
                              <div style={{ fontSize: 14, marginTop: 4 }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                  <div
                                    style={{
                                      background: '#0d3a4a',
                                      borderRadius: '25%',
                                      padding: 4,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img src={syntax_gems}  alt="Gems" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />
                                  </div>
                                  
                                  <span style={{ color: '#ffffff' }}>{formatNumber(item.GemsResult)}</span>
                                </span>
                                &nbsp;&nbsp;

                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                  <div
                                    style={{
                                      background: '#0d3a4a',
                                      borderRadius: '25%',
                                      padding: 4,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img src={syntax_gold} alt="Gold" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />
                                  </div>

                                  <span style={{ color: '#ffffff' }}>{formatNumber(item.GoldResult)}</span>
                                </span>
                                &nbsp;&nbsp;

                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                  <div
                                    style={{
                                      background: '#0d3a4a',
                                      borderRadius: '25%',
                                      padding: 4,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img src={syntax_pass} alt="Pass" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />
                                  </div>

                                  <span style={{ color: '#ffffff' }}>{formatNumber(item.LevelPass ?? 0)}</span>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      )}
                    </Card>
                  </Col>
                  ))}
                  
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>

        {isLarge && (
          <Col xs={0} lg={4}>

            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 12,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.05)',
                color: '#fff',
                animation: 'fadeInUp 0.5s ease forwards',
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShareAltOutlined style={{ color: '#66ccff' }} />
                  <span style={{ fontWeight: 'bold', color: 'rgb(166 210 233)', fontSize: 14 }}>
                    Contact
                  </span>
                </div>
                {/* <div style={{ fontSize: 24, fontWeight: 'bold', color: '#33ccff', marginTop: 8 }}>
                  {durationString}
                </div>
                <div style={{ fontSize: 13, color: '#ccc', marginTop: 2 }}>
                  Since January 02, 2023
                </div> */}
              </div>
              <Divider style={{ borderColor: '#1e293b' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <DiscordOutlined style={{ color: '#66ccff' }} />
                  <span style={{ color: '#ccc', fontSize: 14 }}>Discord Members</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 'bold', color: '#33ccff' }}>1.2K+</span>
              </div>
              <div style={{ marginTop: 8 }}>
              {contextHolder}
              <Tag
                color="cyan"
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  width: '100%',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: 13,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  discord.gg/syntaxshop
                </span>
                <FileTextOutlined />
              </Tag>

              <div style={{ marginTop: 11 , display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FacebookOutlined style={{ color: '#66ccff' }} />
                  <span style={{ color: '#ccc', fontSize: 14 }}>Facebook Fanpage</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 'bold', color: '#33ccff' }}>638+</span>
              </div>
              <div style={{ marginTop: 8 }}>
              {contextHolder}
              <Tag
                color="cyan"
                onClick={handleCopyfacebook}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  width: '100%',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: 13,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  facebook.com/syntaxRobuxshop
                </span>
                <FileTextOutlined />
              </Tag>
              </div>
              </div>
            </Card>
            <div style={{ marginBottom: 11 }}></div>

            <Card
              title={
                <span style={{ color: '#66ccff', fontSize: 16, fontWeight: 'bold' }}>
                  <EyeOutlined style={{ marginRight: 8 }} />
                  Secret Alert
                </span>
              }
              style={{
                marginTop: 10,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 12,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.05)',
                color: '#fff',
              }}
            > 
              <div key='secret'>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#fff' }}>
                    MA****3Y
                  </span>
                  <span ><Tag style={{background: ('#2a12153b')}} color='red'> Shadow </Tag></span>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#fff' }}>
                    al****v2
                  </span>
                  <span ><Tag style={{background: ('#2a12153b')}} color='red'> Shadow </Tag></span>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#fff' }}>
                    bl****04
                  </span>
                  <span ><Tag style={{background: ('#2a12153b')}} color='red'> Shadow </Tag></span>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#fff' }}>
                    Lu****er
                  </span>
                  <span ><Tag style={{background: ('#2a12153b')}} color='red'> Shadow </Tag></span>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#fff' }}>
                    ka****01
                  </span>
                  <span ><Tag style={{background: ('#2a12153b')}} color='red'> Sola Fish </Tag></span>
                </div>
                <Divider style={{ margin: '10px 0' }} />
              </div>
            </Card>
            <Card
              title={
                <span style={{ color: '#66ccff', fontSize: 16, fontWeight: 'bold' }}>
                  <ShoppingOutlined style={{ marginRight: 8 }} />
                  New Topup
                </span>
              }
              style={{
                marginTop: 10,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 12,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.05)',
                color: '#fff',
              }}
            >
              {dataList.map((list, index) => {
                const createdAt = new Date(list.created_at);

                return (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      <span style={{ color: '#fff' }}>
                        {list.sender_bank}
                      </span>
                      <span style={{ color: '#00e6e6', fontWeight: 'bold' }}>฿{list.balance}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 12,
                        color: '#aaa',
                        marginTop: 4,
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <ClockCircleOutlined style={{ marginRight: 4 }} />
                        {createdAt.toLocaleString('th-TH', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <UserOutlined style={{ marginRight: 4 }} />
                        {list.idplayer.length > 6 ? list.idplayer.slice(0, 6) + '...' : list.idplayer}
                      </span>
                    </div>
                    <Divider style={{ margin: '10px 0' }} />
                  </div>
                );
              })}
            </Card>
          </Col>
        )}

      </Row>
      <div style={{ marginTop: 10,}}></div>
    </Fragment>
  )
}

export default Dashboard