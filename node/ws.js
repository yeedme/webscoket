// 导入ws和mqtt模块
const WebSocket = require('ws');
const mqtt = require('mqtt');

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port: 8080 });

// 创建MQTT客户端
const mqttClient = mqtt.connect('mqtt://broker.emqx.io:1883');

// 当WebSocket有新的连接建立时
wss.on('connection', function connection(ws) {
  console.log('新的WebSocket连接建立');

  // 当收到WebSocket客户端消息时
  ws.on('message', function incoming(message) {
    console.log('收到WebSocket消息:', message);

    // 通过MQTT发布消息
    mqttClient.publish('ttttttt', message.toString(), { qos: 1 }, function (err) {
      if (err) {
        console.error('发布MQTT消息失败:', err);
      } else {
        console.log('MQTT消息已发布');
      }
    });

    // 回复WebSocket客户端
    ws.send('服务器已收到你的消息，并已通过MQTT发送：' + message);
  });

  // 当WebSocket连接关闭时
  ws.on('close', function close() {
    console.log('WebSocket连接已关闭');
  });
});

// 当MQTT客户端连接成功时
mqttClient.on('connect', function () {
  console.log('MQTT客户端已连接到服务器');
});

// 当MQTT客户端连接失败时
mqttClient.on('error', function (err) {
  console.error('MQTT连接失败:', err);
});

// 当MQTT客户端收到消息时（如果需要的话）
mqttClient.on('message', function (topic, message) {
  console.log('收到MQTT消息:', message.toString());
  // 这里可以处理从MQTT服务器接收到的消息，如果需要的话
});

console.log('WebSocket服务器已启动，正在监听端口8080...');