import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { connect } from './dbConfiguration.js';
import morgan from 'morgan';
import authrouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js'
import { connectConsumer } from './kafka/orderConsumer.js';


const accessLogStream = fs.createWriteStream(
    path.join(process.cwd(), 'access.log'),
    { flags: 'a' } // append mode
  );


const app = express()
const PORT = 5000;

// Use CORS middleware
// Dockerization and CI/CD pipleline 

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}))

// db connection 
connect()
// Add morgan middleware
// Used for logging the logs
app.use(morgan('combined', { stream: accessLogStream }));

app.use(morgan('dev'));
app.use(express.json());

connectConsumer()

app.get('/', (req, res) => {
    res.send("Server is running for microservices!!!!")
})

// authRouter
app.use('/auth',authrouter);

// productRouter
app.use('/userProduct',productRouter)



app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`)
})




