import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignUpService } from './signup.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('signup')
export class AuthController {
  constructor(private readonly authService: SignUpService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
}
