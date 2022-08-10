import express from 'express';
import { HTTP_HOST, HTTP_PORT, MONGO_URL } from './config.js';
import { createServer } from 'http';
import mongoose from 'mongoose';
import {router as testRouter} from './routes/test.js';
import { unknownReq } from './middlewares/error404.js';
import session from 'express-session';
import passport from 'passport';
import { initPassport } from './middlewares/passport.js';

const app = express()

app.use(express.json());
// app.use(express.urlencoded());

app.use(session({secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());

initPassport(passport)

app.use('/api/test/', testRouter)
app.use(unknownReq)

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