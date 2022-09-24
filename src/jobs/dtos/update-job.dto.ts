import { IsOptional, MaxLength, MinLength, IsEnum } from 'class-validator'

export class UpdateJobDto {
    @IsOptional()
    @MaxLength(50)
    @MinLength(3)
    company: string

    @IsOptional()
    @MaxLength(50)
    @MinLength(3)
    position: string

    @IsOptional()
    @IsEnum(['interview', 'declined', 'pending'])
    status: string
}