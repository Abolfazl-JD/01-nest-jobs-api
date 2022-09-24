import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator'

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password : string
}