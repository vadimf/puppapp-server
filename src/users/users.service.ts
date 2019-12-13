import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { DUPLICATE_KEY } from '../utils/mongo-error-codes';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    
    let newUser;
    
    if (createUserDto.password) {
      newUser = new this.userModel({ email, password: createUserDto.password });
    } else {
      newUser = new this.userModel({ email, facebookId: createUserDto.facebookId });
    }
    
    try {
      await newUser.save();
    } catch (error) {
      if (error.code === DUPLICATE_KEY) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newUser;
  }
  
  async findOne(query: any): Promise<User | undefined> {
    return this.userModel.findOne(query);
  }
  
  async updateUser(user: User, updatedUser: UpdateUserDto): Promise<User> {
    const userDocument = await this.findOne({ _id: user._id });
    userDocument.set(updatedUser);
    return userDocument.save();
  }
  
  async validateUserPassword(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = await this.findOne({ email: email.toLowerCase() });
    
    if (user && await user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }
}
