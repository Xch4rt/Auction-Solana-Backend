import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignInService } from './signin.service';
import { CreateSignInDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('signin')
export class SignInController {
  constructor(private readonly authService: SignInController) {}

  @Post()
  create(@Body() createSignInDto: CreateSignInDto) {
    return this.authService.create(createSignInDto);
  }
}
