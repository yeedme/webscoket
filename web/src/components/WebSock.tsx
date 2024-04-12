import React, { useEffect } from 'react';

const WebSocketComponent = () => {
  useEffect(() => {
    // 创建WebSocket连接
    const socket = new WebSocket('ws://localhost:8080'); // 替换为你的服务器地址

    // 监听连接打开事件
    socket.onopen = () => {
      console.log('WebSocket connected');
      // 发送消息给服务器
      socket.send('Hello server!');
    };

    // 监听接收到的消息
    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    // 监听连接关闭事件
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // 在组件卸载时关闭WebSocket连接
    return () => {
      socket.close();
    };
  }, []);

  return <div>WebSocket Component</div>;
};

export default WebSocketComponent;
