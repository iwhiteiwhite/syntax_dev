/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Tag, Progress, Avatar, Row, Col, Divider, Table , Spin , Button, Result } from "antd";
import {ExclamationCircleOutlined , RetweetOutlined ,ClockCircleOutlined,DesktopOutlined,FireOutlined,DatabaseOutlined,ThunderboltOutlined,SyncOutlined,} from "@ant-design/icons";
import { useParams , useNavigate } from "react-router-dom";
import SERVER_API_URL from './config';
import syntax_pass from "../image/syntax_pass.png";
import syntax_gems from "../image/syntax_gems.png";
import syntax_gold from "../image/syntax_gold.png";
import def_livestream from "../image/roblox_loaded.png";

const AccountCard = () => {
  const { idplayer } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [data, setUserData] = useState([]);
  const [dataPerson, setPersonrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [livestreamUrl, setLivestreamUrl] = useState("");
  const [dataImage, setImageList] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [loadingSpin, setLoadingSpin] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSpin(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 632);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!idplayer) return;
  
    const fetchData = async () => {
      try {

        const res = await fetch(`${SERVER_API_URL}/api/v1/data/image-data/${idplayer}`);
        // if (!res.ok) throw new Error('Image path not found');
  
        const data = await res.json();
        const path = data.path;

        const imageRes = await fetch(`${SERVER_API_URL}/image/${path}/${idplayer}`);
        const images = await imageRes.json();
        setImageList(images);
  
        const updateLivestream = () => {
          const timestamp = Date.now();
          const url = `${SERVER_API_URL}/proxy/${path}/${idplayer}/livestream.png?ts=${timestamp}`;
          setLivestreamUrl(url);
        };
  
        updateLivestream();
        const interval = setInterval(updateLivestream, 4000);

        return () => clearInterval(interval);
  
      } catch (err) {
        console.error('Error fetching images:', err.message);
        setImageList([]);
      }
    };
  
    const cleanupPromise = fetchData();
    return () => {
      cleanupPromise.then((cleanupFn) => {
        if (typeof cleanupFn === 'function') cleanupFn();
      });
    };
  }, [idplayer]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
  
        const accountRes = await fetch(`${SERVER_API_URL}/api/v1/account/data/${idplayer}`);
  
        const decodeAndParse = async (res) => {
          const data = await res.text();
          const cleaned = data.substring(1, data.length - 1);
          let decoded = cleaned;
          for (let i = 0; i < 5; i++) {
            decoded = atob(decoded);
          }
          return JSON.parse(decoded);
        };
  
        const accountData = await decodeAndParse(accountRes);
        setPersonrData(accountData);
        const namePlayer = accountData.id;
  
        const tokenRes = await fetch(`${SERVER_API_URL}/api/v1/data/${namePlayer}`);
        const tokenData = await decodeAndParse(tokenRes);
        setUserData(tokenData);
  
        const res = await fetch(`${SERVER_API_URL}/api/proxy/v1/imageurl`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: accountData.idplayer })
        });
        const data = await res.json();
        setImgUrl(data.imageUrl);
  
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllData();
    const handler = () => {
      fetchAllData();
    };
  
    window.addEventListener("refresh-data", handler);
    return () => {
      window.removeEventListener("refresh-data", handler);
    };
  }, [idplayer]);

  const formatNumber = (num) => {
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  };

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

  if (!dataPerson) {
    return (
      <div>

        <Result
          status="error"
          title="No data found for this Account"
          subTitle="Go back to Account Page"
          extra={[
            <Button key="buy" onClick={() => navigate('/account')}>Go Back</Button>,
          ]}
        />
      </div>
    );
  }

  return (
    
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <Card
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 12,
          boxShadow: "0 0 10px rgba(0, 255, 255, 0.05)",
          color: "#fff",
          width: "100%",
        }}
      >
        <Row
          justify="center"
          style={{
            padding: "24px",
          }}
        >
          <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>
            <Card
              style={{
                width: "100%",
                maxWidth: 900,
                margin: "0 auto",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 12,
                color: "#fff",
              }}
            >
              <Row gutter={16} align="middle">
                <Col>
                  <Avatar
                    size={80}
                    src={imgUrl}
                    style={{
                      border: "2px solid #00ffff",
                      boxShadow: "0 0 6px #00ffff",
                    }}
                  />
                </Col>

                <Col flex="auto">
                  <Row justify="space-between" align="middle">
                    <Col>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#33ccff",
                        }}
                      >
                        {maskUsername(dataPerson.idplayer)}
                      </div>
                    </Col>
                    <Col>
                    <div style={{ fontSize: 14, marginTop: 8 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          background: "#0d3a4a",
                          borderRadius: "25%",
                          padding: 4,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={syntax_gems}
                          alt="Gems"
                          style={{
                            width: 16,
                            height: 16,
                            verticalAlign: "middle",
                          }}
                        />
                      </div>

                      <span style={{ color: "#ffffff" }}>
                        {formatNumber(dataPerson.GemsResult)}
                      </span>
                    </span>
                    &nbsp;&nbsp;
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          background: "#0d3a4a",
                          borderRadius: "25%",
                          padding: 4,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={syntax_gold}
                          alt="Gold"
                          style={{
                            width: 16,
                            height: 16,
                            verticalAlign: "middle",
                          }}
                        />
                      </div>

                      <span style={{ color: "#ffffff" }}>
                        {formatNumber(dataPerson.GoldResult)}
                      </span>
                    </span>
                    &nbsp;&nbsp;
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          background: "#0d3a4a",
                          borderRadius: "25%",
                          padding: 4,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={syntax_pass}
                          alt="Pass"
                          style={{
                            width: 16,
                            height: 16,
                            verticalAlign: "middle",
                          }}
                        />
                      </div>

                      <span style={{ color: "#ffffff" }}>
                        {formatNumber(dataPerson.LevelPass ?? 0)}
                      </span>
                    </span>
                  </div>
                    </Col>
                  </Row>
                  {dataPerson &&
                    dataPerson.startTime &&
                    (() => {
                      const currentTime = Math.floor(Date.now() / 1000);
                      const endTime = dataPerson.endTime;
                      const startTime = dataPerson.startTime;
                      const remaining = endTime - currentTime;
                      const hours = Math.floor(remaining / 3600);
                      const minutes = Math.floor((remaining % 3600) / 60);
                      const seconds = Math.max(0, remaining % 60);

                      const nowMs = Date.now();
                      const nowUnix = Math.floor(nowMs / 1000);
                      const input = startTime;
                      const [day, month, year, time] = input.split(":");
                      const [hour, minute, second] = time.split(".");

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
                      const percent =
                        ((nowUnix - unixTimestamp) /
                          (endTime - unixTimestamp)) *
                        100;
                      const percentInt = Math.floor(percent);
                      const displayPercent = percentInt < 0 ? 100 : percentInt;

                      const updatedTime = new Date(dataPerson.update_at);
                      const now = new Date();
                      const diffInMinutes = (now.getTime() - updatedTime.getTime()) / (1000 * 60);
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            marginBottom: 4,
                            marginTop:5,
                          }}
                        >
                          <div
                            style={{
                              gap: 8,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flexWrap: "wrap",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              {dataPerson.farm_story && (
                                <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="purple">
                                  Story
                                </Tag>
                              )}
                              {dataPerson.farm_gem && (
                                <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="purple">
                                  Gems
                                </Tag>
                              )}
                              {dataPerson.farm_challenge && (
                                <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="purple">
                                  Challenge
                                </Tag>
                              )}
                              {dataPerson.farm_zcity && (
                                <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="purple">
                                  Z City
                                </Tag>
                              )}
                              {dataPerson.farm_portalMode && (
                                <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="magenta">
                                  Portal
                                </Tag>
                              )}
                              {dataPerson.farm_bossEvent && (
                                <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="red">
                                  BOSS
                                </Tag>
                              )}
                              {dataPerson.farm_madara && (
                                <Tag style={{ backgroundColor: '#1a132529', color: '#15fff8' }} icon={<ExclamationCircleOutlined />} color="red">
                                  Madara
                                </Tag>
                              )}

                              {dataPerson.farm_goku && (
                                <Tag style={{ backgroundColor: '#1a132529', color: '#15fff8' }} icon={<ExclamationCircleOutlined />} color="red">
                                  Goku
                                </Tag>
                              )}

                              {dataPerson.farm_geto && (
                                <Tag style={{ backgroundColor: '#1a132529', color: '#15fff8' }} icon={<ExclamationCircleOutlined />} color="red">
                                  Geto
                                </Tag>
                              )}
                              {dataPerson.farm_rangex && (
                                <Tag  style={{backgroundColor:('#1a132529')}} icon={<ExclamationCircleOutlined />} color="volcano">
                                  Ranger
                                </Tag>
                              )}
                              {dataPerson.farm_secertMode && (
                                <Tag  style={{backgroundColor:('#1a132529') , color:'#39e89f' }} icon={<ExclamationCircleOutlined />} color="red">
                                  Secert
                                </Tag>
                              )}
                            </div>

                            {remaining > 0 ? (
                              diffInMinutes > 20 ? (
                                <Tag style={{ margin: 0 , background:"#1d1d1d30" }} icon={<ExclamationCircleOutlined />} color="default">
                                  Offline
                                </Tag>
                              ) : dataPerson.resual === 'Lobbie' ? (
                                <Tag style={{ margin: 0 }} icon={<ExclamationCircleOutlined />} color="blue">
                                  Waiting
                                </Tag>
                              ) : dataPerson.resual === 'in-Game' ? (
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

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              color: "rgb(143 210 238 / 68%)",
                              fontSize: 14,
                              marginTop: 4,
                              marginBottom: 6,
                            }}
                          >
                            <div style={{ textAlign: "left" }}>
                              {remaining > 0
                                ? `${hours}h ${minutes}m ${seconds}s`
                                : "0h 0m 0s"}
                            </div>
                            <div style={{ textAlign: "right" }}>
                              {displayPercent}%
                            </div>
                          </div>

                          <div
                            style={{
                              width: "100%",
                              backgroundColor: "#1e293b",
                              borderRadius: 10,
                              height: 8,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${displayPercent}%`,
                                background:
                                  "linear-gradient(90deg, #00ffe7, #0099ff)",
                                height: "100%",
                                borderRadius: 10,
                                transition: "width 0.5s ease",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        

        <Divider style={{ borderColor: "#1e293b", margin: "24px 0" }} />

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#99ccff",
              marginBottom: 6,
            }}
          >
            Real Time Farming.. (Delay 8sec)
          </div>
        </div>

        {livestreamUrl ? (
          <div style={{ marginTop: 24, marginBottom: 20 }}>
            <Card
              hoverable
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 12,
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.05)",
                color: "#fff",
                padding: 0,
                maxWidth: 450,
                margin: "0 auto",
              }}
              bodyStyle={{ padding: 0 }}
              cover={
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "red",
                      color: "#fff",
                      padding: "4px 10px 4px 8px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      boxShadow: "0 0 8px rgba(255,0,0,0.6)",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        marginRight: 6,
                        animation: "blink 1s infinite",
                      }}
                    />
                    LIVE
                  </div>

                  <img
                    alt="Livestream"
                    src={livestreamUrl}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = def_livestream;
                    }}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      display: "block",
                    }}
                  />
                </div>
              }
            />
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              fontSize: 18,
              marginTop: 24,
              background: "linear-gradient(120deg, #888 20%, #fff 50%, #888 80%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 10s ease-in-out infinite, slowBlink 2s infinite",
              fontWeight: "bold",
            }}
          >
            Wait Livestream
          </div>
        )}

        <Divider style={{ borderColor: "#1e293b", margin: "24px 0" }} />
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#99ccff",
              marginBottom: 6,
            }}
          >
            Reward Farming
          </div>
        </div>

        {loadingSpin ? (
          <div style={{ textAlign: "center", padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {Array.isArray(dataImage) && dataImage.filter((url) => !url.includes("livestream.png")).length > 0 ? (
              dataImage
                .filter((url) => !url.includes("livestream.png"))
                .map((url, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <Card
                      hoverable
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 12,
                        boxShadow: "0 0 10px rgba(0, 255, 255, 0.05)",
                        color: "#fff",
                        padding: 0,
                      }}
                      bodyStyle={{ padding: 0 }}
                      cover={
                        <img
                          alt={`img-${index}`}
                          src={url}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                          }}
                        />
                      }
                    />
                  </Col>
                ))
            ) : (
              <Col span={24} style={{ textAlign: "center", color: "rgba(170, 170, 170, 0.5)", fontSize: 16 }}>
                No Data
              </Col>
            )}
          </Row>
        )}
      </Card>
    </div>
  );
};

export default AccountCard;
