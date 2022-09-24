import { Body, Controller, Post, Session } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('/api/v1/users')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/signup')
    async createNewUser(@Body() body: CreateUserDto, @Session() session: Record<string, any>) {
        const newUser = await this.usersService.createNewUser(body)
        session.userId = newUser.id
        return newUser
    }

    @Post('/login')
    async signinUser(@Body() body: LoginUserDto, @Session() session: Record<string, any>) {
        const loggedInUser = await this.usersService.loginUser(body)
        session.userId = loggedInUser.id
        return loggedInUser
    }
}
