import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsString, MinLength, Validate } from "class-validator";
import { IsMultiCountryPhoneNumber } from "../../decorators/isPhoneNumber.decoration";

export class CreateAdminDto {

    @IsString()
    @ApiProperty({
        example: "Abdulazizbek"
    })
    first_name: string;
    
    @IsString()
    @ApiProperty({
        example: "Abdusodiqov"
    })
    last_name: string;
    
    @IsString()
    @ApiProperty({
        example: "abu_killer_007"
    })
    user_name: string;
    
    @Validate(IsMultiCountryPhoneNumber)
    @ApiProperty({
        example: "+998931234567"
    })
    phone_number: string;
    
    @IsEmail()
    @ApiProperty({
        example: "abu.killer007@gmail.com"
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: "kuchli_parol"
    })
    @MinLength(4)
    password: string;
    @ApiProperty({
        example: "kuchli_parol"
    })
    
    confirm_password: string;
}
