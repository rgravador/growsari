import express, { Express, Request, Response } from 'express';
import userRoutes from './src/routes/user.routes';
import dogsRoutes from './src/routes/dogs.routes';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
const app: Express = express();
const port = process.env.PORT || 3001;

const mongoURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1/DogApp';

app.use(express.json());
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/users', userRoutes);
app.use('/dogs', dogsRoutes);

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
} as ConnectOptions).then(() => {
  console.log('⚡️[Database]: Connected to MongoDB');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}).catch((err: any) => {
  console.log(err);
})