import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignUpService } from './signup.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ValidateDto } from './dto/validate.dto';

@Controller('signup')
@ApiTags('Sign Up')
export class AuthController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.signUpService.create(createAuthDto);
  }

  @Post('validate')
  async validateUser(@Body() code: ValidateDto){
    return await this.signUpService.verifyUser(code);
  }
}
