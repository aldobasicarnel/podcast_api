import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../auth/dtos/CreateUser.dto";
import * as bcrypt from "bcrypt";


@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {
  }

  async createUser(createUserDto: CreateUserDto) {

    const { email, password } = createUserDto;

    const existingUser = await this.usersRepo.findOneBy({ email });

    console.log(existingUser, "EXISTING USER");

    if (existingUser) {
      throw new ConflictException("Email already in use!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "HASHED PASSWORD");

    const newUser = this.usersRepo.create({ ...createUserDto, password: hashedPassword });

    console.log(newUser, "NEW USER");

    return this.usersRepo.save(newUser);
  }

  async findUser(email: string) {
    return await this.usersRepo.findOneBy({ email });
  }
}
