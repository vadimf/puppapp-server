import { createParamDecorator } from '@nestjs/common';
import { User } from '../users/user.interface';

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});
