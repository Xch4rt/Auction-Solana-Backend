import { Module } from '@nestjs/common';
import { SignInService } from './signin.service';
import { SignInController } from './signin.controller';

@Module({
  controllers: [SignInController],
  providers: [SignInService],
})
export class SignInModule {}
