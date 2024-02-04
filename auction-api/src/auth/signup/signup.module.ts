import { Module } from '@nestjs/common';
import { SignUpService } from './signup.service';
import { AuthController } from './signup.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule, EmailModule],
  providers: [SignUpService],
})
export class SignUpModule {}
