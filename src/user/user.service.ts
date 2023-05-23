import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDTO.email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userModel.create(createUserDTO);

    const salt = await bcrypt.genSalt(10);

    if (salt) {
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
    } else {
      throw new Error('Something went wrong please try again');
    }
    return newUser.save();
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
}
