import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContractConditionDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    contractId: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    terminationFee: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    disputeResolution: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    paymentTerms: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    penaltyTerms: string;
}
