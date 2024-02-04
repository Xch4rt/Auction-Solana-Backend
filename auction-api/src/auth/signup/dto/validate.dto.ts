import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";

export class ValidateDto {

    @ApiProperty({
        type: String,
        example: '123456'
    })
    @IsString()
    @IsNotEmpty()
    readonly code: string;

    @ApiProperty({
        type: Number,
        example: '123'
    })
    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
}