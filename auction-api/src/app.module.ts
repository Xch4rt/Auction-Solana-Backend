import { Module } from '@nestjs/common';
import { SignInModule } from './auth/signin/signin.module';
import { SignUpModule } from './auth/signup/signup.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SignInModule,
    SignUpModule,
    EmailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
