import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSignInDto {

    @ApiProperty({
        type: String,
        example: 'username'
    })
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({
        type: String,
        example: 'password',
        description: 'User\'s description'
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
