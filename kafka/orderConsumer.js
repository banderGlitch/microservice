import kafka from './kafkaClient.js';

const consumer = kafka.consumer({ groupId: 'product-service-group' });

export const connectConsumer = async () => {
    await consumer.connect();
    console.log('🔗 Kafka Consumer connected');
  
    await consumer.subscribe({ topic: 'order_created', fromBeginning: false });
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = JSON.parse(message.value.toString());
        console.log('📦 New Order Event Received:', value);
  
        // Later you can: update stock, trigger email, etc.
      },
    });
  };