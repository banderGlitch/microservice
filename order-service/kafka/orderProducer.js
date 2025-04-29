import kafka from "./kafkaClient.js";

const producer = kafka.producer()

export const connectProducer = async () => {
    await producer.connect();
    console.log('🚀 Kafka Producer connected');
}



export const produceOrderCreated = async (order) => {
    try {
        await producer.send({
            topic: 'order_created',
            messages: [
                {
                    key: order._id.toString(),
                    value: JSON.stringify(order),
                },
            ],
        })

    } catch (err) {
        console.error('❌ Failed to produce order event', err);
    }
}