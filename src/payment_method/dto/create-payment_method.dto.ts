import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentMethodDto {
    @ApiProperty({example:"promise"})
    @IsString()
    @IsNotEmpty()
    name:string
}
