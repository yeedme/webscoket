import { Button, Form, Switch } from 'antd'
import mqtt from 'mqtt'
import React, { useCallback, useEffect } from 'react'
const useMqttClient = ( topic,client) => {
  useEffect(() => {

    // 连接成功回调函数
    client.on('connect', () => {
      console.log('Connected to MQTT server');
      
      // 订阅主题
      client.subscribe(topic);
    });

    // 收到消息回调函数
    client.on('message', (receivedTopic, message) => {
      console.log(`Received message on topic ${receivedTopic}: ${message.toString()}`);
    });

    // 组件卸载时断开连接
    return () => {
      client.end(); // 断开与 MQTT 服务器的连接
    };
  }, [topic,client]);
};

export default function Control() {
  const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt'); // 替换为你的MQTT服务器地址
  useMqttClient( 'ttttttt',client); // 传入 MQTT 服务器地址和要订阅的主题
  const [form] = Form.useForm();
 
  // 发送消息函数
  const sendMessage = useCallback(() => {
    console.log("sendMessage");
    const message = 'React web app'; // 要发送的消息内容
    client.publish('ttttttt', message); // 替换为你要发布消息的主题
  }, [client]);
  return (
    <> 
        <div className='w-full'>
          <Form form={form}>
          <Form.Item label="GIOP1" style={{width:'200px'}}>
          <Switch checkedChildren="高电平" unCheckedChildren="低电平" defaultChecked />
          </Form.Item>
          <Form.Item label="GIOP1" style={{width:'200px'}}>
          <Switch checkedChildren="高电平" unCheckedChildren="低电平" defaultChecked />
          </Form.Item>
          </Form>
          <Button onClick={()=>sendMessage()}>更新</Button>
        </div>
</>
  )
}
