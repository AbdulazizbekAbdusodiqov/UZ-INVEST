import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
} from "class-validator";

export enum Role {
    INVESTOR = "INVESTOR",
    ENTREPRENEUR = "ENTREPRENEUR",
}

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // @ApiProperty()
    // @IsPhoneNumber("UZ")
    // @IsNotEmpty()
    // phone_number: string;

    @ApiProperty({ enum: Role, description: "enum: INVESTOR and ENTREPRENEUR" })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // tg_link: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
    @ApiProperty()
    confirm_password: string;
}
