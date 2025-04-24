import express from 'express'
import cors from 'cors';
import  connect from './dbConfiguration.js';
import orderRoute from './routes/orderRoutes.js'

const PORT = 9200

const app = express();

app.use(express.json())

app.use('/orders', orderRoute);

connect()

app.use(cors())

app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`)
})



