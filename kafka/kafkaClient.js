import { Kafka } from 'kafkajs';

import dotenv from 'dotenv'


dotenv.config();

const kafka = new Kafka({
    clientId: 'product-service',
    brokers: [process.env.KAFKA_BROKER],
    ssl: true,
    sasl : {
        mechanism : 'plain',
        username: process.env.KAFKA_API_KEY,
        password: process.env.KAFKA_API_SECRET
    }
})

export default kafka