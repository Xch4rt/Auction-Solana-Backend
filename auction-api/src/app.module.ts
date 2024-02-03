import { Module } from '@nestjs/common';
import { SignInModule } from './auth/signin/signin.module';
import { SignUpModule } from './auth/signup/signup.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SignInModule,
    SignUpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
