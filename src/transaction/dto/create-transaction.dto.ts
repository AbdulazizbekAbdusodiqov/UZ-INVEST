import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

enum Status {
    PENDING="PENDING",
    COMPLETED="COMPLETED",
    FAILED="FAILED"
}

enum Type {
    INVESTMENT="INVESTMENT",
    PROFIT="PROFIT",
    PAYMENT="PAYMENT",
}
export class CreateTransactionDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    contractId: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    receiverId: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    senderID: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;
    
    @ApiProperty()
    @IsEnum(Type)
    @IsNotEmpty()
    type: Type;
    
    @ApiProperty()
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    paymentMethodId: number;
}
