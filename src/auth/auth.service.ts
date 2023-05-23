import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {} // 2

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (user && isPasswordMatch) {
        return user;
      }
      return null;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (user) {
      const payload = {
        username: user.username,
        sub: user._id,
        roles: user.roles,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else return user;
  }
}
