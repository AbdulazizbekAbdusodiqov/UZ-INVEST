import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber("UZ")
    phone_number?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    tg_link?: string;
}
