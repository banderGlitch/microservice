import express from 'express'
import cors from 'cors';
import connect from './dbConfiguration.js';
import orderRoute from './routes/orderRoutes.js'
import { connectProducer } from './kafka/orderProducer.js';

const PORT = 9200

const app = express();

app.use(express.json())

app.use('/orders', orderRoute);


connect()

app.use(cors())


connectProducer()



app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`)
})
















// Step-by-Step Plan

// Use axios inside order-service to call product-service directly 

// Loop through each productId from the order and validate against /products/:id


// 🔄 Connect this to the product-service to validate product IDs before creating an order? 

// Kafka is often used to enable communication between microservices --- but for asynchronous, event-driven communication 


// 🧠 So What Is Kafka Really For?

// Kafka is a high-throughput distributed event streaming platform, mainly used for:

// Service-to-service messaging	Send/receive data without direct HTTP calls

// Event-driven architecture	Services react to "events" like order.created, user.registered


// Decoupling services	 Product service doesn’t need to “know” about order service — it just emits an event

// Replayable logs Events are stored and can be replayed


// Scalability  Handles millions of messages/sec


/* asdasdasd
 asdasdasd
*/

// function outerfunction_1(fn) {
//     let oldargs = []
//     return function (args) {
//         oldargs.push(args)
//         return function (args) {
//             oldargs.push(args)
//             return function (args) {
//                 oldargs.push(args)
//                 console.log("oldargs", oldargs)
//                 return fn(...oldargs)
//             }
//         }

//     }
// }









// function outerfunction_1(fn) {
//     let oldargs = []
//     return function (args) {
//         if (oldargs.length == fn.args) {
//             fn(...oldargs)
//         } else {
//             return function curry(args) {

//             }
//         }


//     }
// }



