import { createParamDecorator } from '@nestjs/common';
import { User } from '../../users/interfaces/user.interface';

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});
