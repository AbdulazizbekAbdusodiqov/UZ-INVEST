import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProjectDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty()
    // @IsNumber()
    @IsNotEmpty()
    entreprenuerId: number;
    
    @ApiProperty()
    // @IsNumber()
    @IsNotEmpty()
    project_typeId: number;
    
    @ApiProperty()
    // @IsNumber()
    @IsNotEmpty()
    budged: number;
}
