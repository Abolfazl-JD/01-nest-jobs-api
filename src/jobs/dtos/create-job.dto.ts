import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateJobDto {
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(3)
    company: string

    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(3)
    position: string
}