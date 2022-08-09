import 'dotenv/config';

const HTTP_HOST = process.env.HTTP_HOST || 'localhost';
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/';

export {HTTP_HOST, HTTP_PORT, MONGO_URL};
