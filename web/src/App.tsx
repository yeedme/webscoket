 

import { Form, Switch } from 'antd';
import './App.css'
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
 
 
// import MqttC from './Mqtt';
 
// import WebSocketComponent from './components/WebSock';
 

 
 


function App() {
 
  const [form]=useForm();
const sendMessage = () => {
  if (ws.current && ws.current.readyState === WebSocket.OPEN) {
    ws.current.send("hi");
    setMessage(''); // 清空输入框或消息状态，根据需求而定
  } else {
    alert('WebSocket is not open. Please try again later.');
  }
}; 

const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  //启动
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8091');
    ws.current.onmessage = e => {
      // setMessage(e.data);

    
    };
    return () => {
      ws.current?.close();
    };
  }, [ws]);


  const [keyPressed, setKeyPressed] = useState(false);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     setKeyPressed(true);
  //     console.log('Key pressed:', event.key);
  //   };

  //   const handleKeyUp = (event) => {
  //     setKeyPressed(false);
  //     console.log('Key released:', event.key);
  //   };

  //   // 添加事件监听器
  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('keyup', handleKeyUp);

  //   // 清除事件监听器
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('keyup', handleKeyUp);
  //   };
  // }, []); // 空依赖数组确保只运行一次



  return (
    <div>
      <h1>WebSocket Client</h1>
      <p>收到的消息：{message}</p>
     {/*  <Input value={value} onChange={(v:any,o:any)=>setValue(v)}/> */}
      <input type="text" />
      <Form
        form={form}
        layout="inline"
        
        labelCol={{
          style: { width: 120 },
        }}
      >
         <Form.Item  >

      引脚控制：
         </Form.Item>
        <Form.Item label="GIOP1" name="GIOP1">
          <Switch  checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item label="GIOP2" name="GIOP21">
          <Switch  checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item label="GIOP3" name="GIOP3">
          <Switch  checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>

      </Form>
      <Form>
      <Form.Item label="LODE" name="LODE">
        <TextArea rows={4} showCount />
        </Form.Item>
      </Form>
      <button onClick={sendMessage}>同步消息</button>
      <button onClick={sendMessage}>发送到指定主题</button>
      <button onClick={()=>    console.log(form.getFieldsValue())}>发一个</button>
      <button onClick={()=>    console.log(form.getFieldsValue())}>发一个</button>
    </div>
  );
}

export default App
