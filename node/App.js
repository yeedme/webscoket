const mqtt = require('mqtt');
const WebSocket = require('ws');

const PORT = 8091; // WebSocket服务器端口
const MQTT_BROKER = 'mqtt://127.0.0.1:1883'; // MQTT服务器地址
const clientId = 'my-websocket-mqtt-bridge'; // 定义 MQTT 客户端 ID
const topic = "ttttttt"; // MQTT 主题

// 创建 MQTT 客户端
const mqttClient = mqtt.connect(MQTT_BROKER, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'node',
  password: 'node123456',
  reconnectPeriod: 1000,
});

mqttClient.on('error', (err) => {
  console.error('MQTT error:', err);
});

mqttClient.on('connect', () => {
  console.log('MQTT connected');
  mqttClient.subscribe(topic, { qos: 0 }); // 订阅主题
});

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    console.log(`Received WebSocket message: ${message}`);
    try {
      mqttClient.publish(topic, message, { qos: 0 }); // 发布到 MQTT 服务器
    } catch (err) {
      console.error('Failed to publish to MQTT:', err);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

wss.on('error', (err) => {
  console.error('WebSocket error:', err);
});

mqttClient.on('message', (mqttTopic, message) => {
  if (mqttTopic === topic) {
    wss.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(message.toString()); // 发送给所有 WebSocket 客户端
        } catch (err) {
          console.error('Failed to send message to WebSocket client:', err);
        }
      }
    });
  }
});

console.log(`WebSocket server started on port ${PORT}`);