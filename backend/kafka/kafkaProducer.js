const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'auth-service', brokers: ['localhost:9092'] }); //
const producer = kafka.producer(); //create producer  instance. 
//Producer is used to send messages to Kafka topics (e.g., user-registered

async function connectProducer() {
  await producer.connect();
  console.log('Kafka Producer connected');
}

connectProducer();

module.exports = producer;
