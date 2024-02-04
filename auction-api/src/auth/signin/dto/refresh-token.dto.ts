import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RefreshTokenDto {

    @ApiProperty({
        type: Number,
        example: '123'
    })
    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;

    @ApiProperty({
        type: String,
        example: 'large-resfresh-token',
    })
    @IsString()
    @IsNotEmpty()
    readonly refreshToken: string;
}
