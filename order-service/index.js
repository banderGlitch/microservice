import express from 'express'
import cors from 'cors';
import  connect from './dbConfiguration.js';

const PORT = 9200

const app = express();

app.use(express.json())

connect()

app.use(cors())

app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`)
})



