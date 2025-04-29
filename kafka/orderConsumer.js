import { createKafkaConsumer } from "./consumerFactory.js";
import Product from "../models/Product.js";


const orderCreateHandler = async (order) => {
    console.log('📦 New Order Event Received:', order);
          
    for (const item of order.products) {
        await Product.findOneAndUpdate(
            { _id: item.productId },
            { $inc: { stock: -item.quantity } }
        )
    }

    console.log('✅ Stock updated based on order');
}


export const connectConsumer = async () => {
    await createKafkaConsumer({
        topic: 'order_created',
        groupId: 'product-service-group',
        handler: orderCreateHandler,
    })
}





// import kafka from './kafkaClient.js';

// const consumer = kafka.consumer({ groupId: 'product-service-group' });

// export const connectConsumer = async () => {
//     await consumer.connect();
//     console.log('🔗 Kafka Consumer connected');
  
//     await consumer.subscribe({ topic: 'order_created', fromBeginning: false });
  
//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const value = JSON.parse(message.value.toString());
//         console.log('📦 New Order Event Received:', value);
  
//         // Later you can: update stock, trigger email, etc.
//       },
//     });
//   };