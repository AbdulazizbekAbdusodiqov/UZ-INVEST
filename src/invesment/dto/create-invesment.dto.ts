import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInvesmentDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    investorId: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    projectTypeId: number;
}
