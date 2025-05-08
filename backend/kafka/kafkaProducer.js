const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'auth-service', brokers: ['localhost:9092'] });
const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log('Kafka Producer connected');
}

connectProducer();

module.exports = producer;
