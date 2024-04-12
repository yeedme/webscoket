 const mqtt = require('mqtt')

const host = '127.0.0.1'
const port = 1883 // 注意：端口通常是一个数字，而不是字符串
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
   username: 'node',
    password: 'node123456',
  reconnectPeriod: 1000,
})

const topic = 'ttttttt'

client.on('connect', () => {
  console.log('Connected', clientId) // 在这里打印客户端ID
  client.subscribe(topic, () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())

})

client.on('error', (error) => {
  console.error('MQTT Client Error:', error)
})

client.on('reconnect', () => {
  console.log('Reconnecting to the MQTT broker...')
})

client.on('offline', () => {
  console.log('Disconnected from the MQTT broker.')
})

client.on('close', () => {
  console.log('MQTT connection closed.')
})