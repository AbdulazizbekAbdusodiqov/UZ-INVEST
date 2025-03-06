import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString,IsEmail, MinLength, IsEnum } from "class-validator";
import { Role } from "./create-user.dto";

export class UserSignInDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: Role, description: "enum: INVESTOR and ENTREPRENEUR" })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}
