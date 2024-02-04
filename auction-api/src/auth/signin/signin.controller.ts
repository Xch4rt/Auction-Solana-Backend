import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignInService } from './signin.service';
import { CreateSignInDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('signin')
@ApiTags('Sign In')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  login(@Body() createSignInDto: CreateSignInDto) {
    return this.signInService.login(createSignInDto);
  }

  @Post('/refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.signInService.refreshToken(refreshTokenDto);
  }
}
