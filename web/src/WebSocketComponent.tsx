import React, { useEffect, useState } from 'react';

function WebSocketComponent() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 创建WebSocket连接
    const ws = new WebSocket('ws://localhost:8089');

    // 监听WebSocket打开事件
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    // 监听WebSocket接收消息事件
    ws.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);

      // 更新消息列表
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // 监听WebSocket关闭事件
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // 设置WebSocket对象
    setSocket(ws);

    // 清理函数，关闭WebSocket连接
    return () => {
      ws.close();
    };
  }, []);

  // 处理发送消息
  const sendMessage = () => {
    if (socket && inputValue) {
      socket.send(inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default WebSocketComponent;
