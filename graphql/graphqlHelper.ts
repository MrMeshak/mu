import { User } from '@prisma/client';

type IUserWithoutSentiveData = Omit<User, 'password'>;

export function removeSensitiveDataUser(user: User): IUserWithoutSentiveData {
  const { password, ...userFiltered } = user;
  return userFiltered;
}
