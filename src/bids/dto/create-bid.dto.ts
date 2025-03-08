import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBidDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    projectId: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    entreprenuerId: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
