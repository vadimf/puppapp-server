import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';

describe('Users Controller', () => {
  let controller: UsersController;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();
    
    controller = module.get<UsersController>(UsersController);
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
});
