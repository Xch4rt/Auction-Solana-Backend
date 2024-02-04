import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CreateAuthDto {

    @ApiProperty({
        type: String,
        example: 'username'
    })
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({
        type: String,
        example: 'example@email.com'
    })
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        type: String,
        example: 'password'
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;


}