import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class FindUserDto {
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsPhoneNumber("UZ")
    phone?: string;
    
    @IsOptional()
    @IsEmail()
    email?: string

}
