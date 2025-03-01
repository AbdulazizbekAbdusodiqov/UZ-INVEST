import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString,IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsPhoneNumber("UZ")
    phone: string;
    
    @ApiProperty()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
