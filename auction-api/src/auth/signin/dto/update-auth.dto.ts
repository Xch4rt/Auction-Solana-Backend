import { PartialType } from '@nestjs/mapped-types';
import { CreateSignInDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateSignInDto) {}
