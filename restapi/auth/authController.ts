import { Request, Response } from 'express';
import isEmail from 'validator/lib/isEmail';
import { loginUser, signupUser } from './authHelper';
import { createToken } from '../../utils/jwtHelper';
import { removeSensitiveDataUser } from '../../graphql/graphqlHelper';

/*
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  phone: string;
*/
export const signup = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password, firstname, lastname, dateOfBirth, phone } = req.body;
  try {
    const user = await signupUser(email, password, firstname, lastname, dateOfBirth, phone);
    const token = createToken(user.id);
    res.cookie('authToken', token, { maxAge: 370000, httpOnly: true, sameSite: 'strict', secure: true });
    res.status(200).json({
      user: removeSensitiveDataUser(user)
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
};

/*
  email: string;
  password: string;
*/
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    const token = createToken(user.id);
    res.cookie('authToken', token, { maxAge: 370000, httpOnly: true, sameSite: 'strict', secure: true });
    res.status(200).json({
      user: removeSensitiveDataUser(user)
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
};

export const logout = (req: Request, res: Response) => {};
