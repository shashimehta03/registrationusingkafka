const { Kafka } = require('kafkajs');

module.exports = async function () {
  const kafka = new Kafka({ clientId: 'auth-consumer', brokers: ['localhost:9092'] });
  const consumer = kafka.consumer({ groupId: 'auth-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'user-registered', fromBeginning: true });
  await consumer.subscribe({ topic: 'user-logged-in', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log(`Received on ${topic}: ${message.value.toString()}`);
      // Perform real-time actions here (send email, log, etc.)
    },
  });
}
