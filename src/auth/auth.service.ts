import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { UserDto } from "./dtos/User.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return plainToInstance(UserDto, user);
    }
    throw new UnauthorizedException("Invalid credentials");
  }

  async login(user: UserDto) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
