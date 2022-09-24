import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password : string
}