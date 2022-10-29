import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();

//Middleware

//Routes

//Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
