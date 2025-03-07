import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfitTypeDto {
    @ApiProperty({example:"percentage"})
    @IsString()
    @IsNotEmpty()
    neme: string;
    
    @ApiProperty({example:"only: percentage', 'fixed', 'dividend', 'capital_gain', 'hybrid'"})
    @IsString()
    @IsNotEmpty()
    description: string;
}
