import bcrypt from 'bcrypt';
import validator from 'validator';
import prisma from '../../prisma/prismaClient';

export const signupUser = async (email: string, password: string, firstname: string, lastname: string, phone: string, dateOfBirth: string) => {
  //Input validation
  if (!email || !password || !firstname || !lastname || !phone || !dateOfBirth) {
    throw Error('All feilds are required');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password must be at least 8 characters with at least one uppercase, lowercase, number and symbol');
  }

  const exists = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  if (exists) {
    throw Error('Email already in use');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //Create User on DB
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hash,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      dateOfBirth: dateOfBirth
    }
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw Error('Email and password are required');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  if (!user) {
    throw Error('Email or Password are invalid');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Email or Password are invalid');
  }
  return user;
};
