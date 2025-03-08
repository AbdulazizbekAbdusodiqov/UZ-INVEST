import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export enum paymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

export class CreatePaymentDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    contractId: number;
    @ApiProperty()
    @IsEnum(paymentStatus)
    @IsNotEmpty()
    status: paymentStatus;
}
