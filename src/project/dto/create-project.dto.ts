import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
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
    @Type(()=>Number)
    @IsNumber()
    @IsNotEmpty()
    entreprenuerId: number;
    
    @ApiProperty()
    @Type(()=>Number)
    @IsNumber()
    @IsNotEmpty()
    project_typeId: number;
    
    @ApiProperty()
    @Type(()=>Number)
    @IsNumber()
    @IsNotEmpty()
    budged: number;
}
