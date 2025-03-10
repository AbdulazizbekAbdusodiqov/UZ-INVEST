import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectTypeDto {
    @ApiProperty({example:"software"})
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({example:"Dasturiy ta'minot loyihasi, masalan, veb ilova yoki mobil ilova"})
    @IsString()
    @IsNotEmpty()
    description: string;
}
