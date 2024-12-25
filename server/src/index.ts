import app from './app';
import config from 'config';
import logger from './utils/logger.utils';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import http from 'http';
import socket from './socket';

const PORT = config.get<number>('port');
const dbUri = config.get<string>('dbUri');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SEC_KEY,
});

const server = http.createServer(app);

socket.listen(server);

const connectDB = (url: string) => {
  return mongoose.connect(url);
};

const startServer = async () => {
  try {
    await connectDB(dbUri);
    server.listen(PORT, () => logger.info(process.env.SERVER_URL));
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

startServer();
