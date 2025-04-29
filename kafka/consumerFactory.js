import kafka from "./kafkaClient.js";


export const createKafkaConsumer = async ({ topic , groupId , handler}) => {
    const consumer = kafka.consumer({groupId})

    await consumer.connect()

    console.log(`🔗 Kafka Consumer connected for topic [${topic}]`);

    await consumer.subscribe({topic, fromBeginning: false})


    
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const parsedMessage = JSON.parse(message.value.toString());
        await handler(parsedMessage); // Pass parsed data to your handler
      } catch (err) {
        console.error('❌ Error in processing Kafka message:', err);
      }
    },
  });

  return consumer; // optional if you want

}