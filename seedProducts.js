import mongoose from "mongoose";
import dotenv from 'dotenv';
import Product from "./models/Product.js";
import { faker } from '@faker-js/faker';

dotenv.config()


// Mongo DB database to inhance
// Generate  random data
const seedData = Array.from({ length: 100 }).map(() => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    category: faker.commerce.department(),
    image: faker.image.url,
    description: faker.commerce.productDescription(),
    stock: Math.floor(Math.random() * 100) + 1,
  }));



  mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(seedData);
    console.log('🌱 100 Products seeded');
    process.exit();
  })
  .catch(err => console.error('❌ Seed error:', err));



  
// export async function connectRandomSeedData() {
//     try {
//         await mongoose.connect(uri)
//         await Product.deleteMany();
//         await Product.insertMany(seedData)
//         console.log('🌱 Products seeded');
//     } catch (err) {
//         console.error('❌ MongoDB error:', err)
//     }

// }