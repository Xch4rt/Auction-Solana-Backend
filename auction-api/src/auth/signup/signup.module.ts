import { Module } from '@nestjs/common';
import { SignUpService } from './signup.service';
import { AuthController } from './signup.controller';

@Module({
  controllers: [AuthController],
  providers: [SignUpService],
})
export class SignUpModule {}
