import { Module } from '@nestjs/common';
import { SignInService } from './signin.service';
import { SignInController } from './signin.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from '../strategies/refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule
  ],
  controllers: [SignInController],
  providers: [SignInService, JwtStrategy, RefreshTokenStrategy],
  exports: []
})
export class SignInModule {}
