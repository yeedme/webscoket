import React, { useEffect, useState, useRef } from 'react';
import mqtt from 'mqtt';
interface IProps {
  host: string;
  port: number;
  clientId: string;
  subscription: { topic: string; qos?: number };
}

export default function MqttC({ host, port, clientId, subscription }:IProps) {
  const [connectStatus, setConnectStatus] = useState('');
  const [payload, setPayload] = useState(null);
  const clientRef = useRef(null);

  const mqttConnect = () => {
    const client = mqtt.connect({ host, port, clientId });
    clientRef.current = client;

    client.on('connect', () => {
      setConnectStatus('Connected');
      if (subscription) {
        mqttSub(subscription);
      }
    });

    client.on('error', (err) => {
      setConnectStatus('Error');
      console.error('Connection error:', err);
    });

    client.on('reconnect', () => {
      setConnectStatus('Reconnecting');
    });

    client.on('message', (topic, message) => {
      const payloadData = { topic, message: message.toString() };
      setPayload(payloadData);
    });

    client.on('close', () => {
      setConnectStatus('Disconnected');
    });
  };

  const mqttSub = (subscription) => {
    const { topic, qos } = subscription;
    if (clientRef.current) {
      clientRef.current.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.error('Subscribe to topic error:', error);
        } else {
          console.log('Subscribed to topic:', topic);
        }
      });
    }
  };

  useEffect(() => {
    mqttConnect();

    // Return cleanup function to unsubscribe and disconnect
    return () => {
      if (clientRef.current) {
        clientRef.current.end(true, () => {
          console.log('MQTT client disconnected');
          clientRef.current = null;
        });
      }
    };
  }, [host, port, clientId, subscription]); // Add dependencies

  const sendMessage = () => {
    const client = clientRef.current;
    if (client && client.connected) {
      client.publish('some/topic', 'Hello MQTT');
    }
  };

  return (
    <div>
      <h1>MQTT Component</h1>
      <p>Connect Status: {connectStatus}</p>
      <p>Payload: {payload ? JSON.stringify(payload) : 'N/A'}</p>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}