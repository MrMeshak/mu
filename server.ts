import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './restapi/auth/authRoutes';

const app = express();

//Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method);
  next();
});

//Routes
app.use('/auth', authRouter);

//

//Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
