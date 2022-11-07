import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'


export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  if(req.cookies.authToken){

  }

  let decoded;
  try {
    const token = req.cookies.authToken;
    decoded = 
  } 
  catch(error){

  }
}

