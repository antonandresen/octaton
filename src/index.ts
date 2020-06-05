import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { connectBot } from './twitch';

dotenv.config();

connectBot(process.env.TWITCH_USERNAME!, process.env.TWITCH_TOKEN!);

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = process.env.PORT || 1337;

const app: Application = express();

// Body parser
app.use(express.json());

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ name: 'octaton' });
});

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
