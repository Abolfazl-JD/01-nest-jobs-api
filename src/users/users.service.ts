import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt'
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
    
    async createNewUser(userInfo: User) {
        const salt = await genSalt(10)
        userInfo.password = await hash(userInfo.password, salt)
        const newUser = new this.userModel(userInfo);
        return newUser.save()
    }

    async loginUser(userInfo: LoginUserDto) {
        const { email, password } = userInfo
        if (!email || !password) throw new BadRequestException('Invalid credentials')
        
        const user = await this.userModel.findOne({ email })
        if (!user) throw new UnauthorizedException('this email has not been signed up yet')
        
        const isPasswordCorrect = await compare(password, user.password)
        if (!isPasswordCorrect) throw new UnauthorizedException('password incorrect')
        
        return user
    }
}
