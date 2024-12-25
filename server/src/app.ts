import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ErrorHandler from './utils/errorHandler.utils';
import errorHandlerMiddleware from './middleware/error';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import transactionRouter from './routes/transaction.route';
import newsletterRouter from './routes/newsletter.route';
import overviewRouter from './routes/overview.route';
import chatRouter from './routes/chat.route';
import messageRouter from './routes/message.route';
import contactRouter from './routes/contact.route';

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL!, process.env.ADMIN_URL!],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  // preflightContinue: true,
};

app.set('trust proxy', true);
app.use(express.urlencoded({ extended: false }));
// app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/newsletters', newsletterRouter);
app.use('/api/overview', overviewRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);
app.use('/api/contacts', contactRouter);

app.get('/healthcheck', (req: Request, res: Response) =>
  res.sendStatus(200),
);

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new ErrorHandler(
    `Route ${req.originalUrl} not found`,
    404,
  );
  next(err);
});

app.use(errorHandlerMiddleware);

export default app;
