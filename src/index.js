import express from 'express';
import { HTTP_HOST, HTTP_PORT, MONGO_URL } from './config.js';
import { createServer } from 'http';
import mongoose from 'mongoose';

const app = express()

async function start() {
  try {
    const server = createServer(app);
    await mongoose.connect(MONGO_URL);
    server.listen(HTTP_PORT, () => {
      console.log(`Server: http://${HTTP_HOST}:${HTTP_PORT}`);
    })
  } catch (error) {
    console.error(error);
  }
}

start();