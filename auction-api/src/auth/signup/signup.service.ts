import { Injectable, InternalServerErrorException, ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { ValidateDto } from './dto/validate.dto';

@Injectable()
export class SignUpService {
  constructor (private readonly dbService : PrismaService, private readonly emailService: EmailService) {}
  private readonly logger = new Logger(SignUpService.name);

  async create(createAuthDto: CreateAuthDto) {
    const {username, email, password} = createAuthDto;

    try {
      const encryptedPassword = await this.encryptPassword(password);
      
      const verificationCode = this.generateCode();
      
      const user = await this.dbService.user.upsert({
        where: {
          username: username,
          email: email
        },
        update: {
          wasUpserted: true
        },
        create: {
          username,
          email,
          verificationCode,
          password: encryptedPassword
        }
      });

      
      if (user.wasUpserted) {
        this.logger.error('User already exists');
        throw new ConflictException('User already exists');
      }


      await this.emailService.sendMailTo('pab203.guti@gmail.com', verificationCode);

      this.logger.log('User created succesfully, pending validation');

      return {
        message: 'User created succesfully',
        userId: user.id
      }

    } catch(error) {
      if (error instanceof ConflictException) {
        this.logger.error(`Error with the user register process: ${error.message}`);
        throw new ConflictException(error.message)
      }
      else {
        this.logger.error(`Error with the user register process: ${error.message}`);
        throw new InternalServerErrorException(error.message)
      } 
    }
  }

  private async encryptPassword (password: string) : Promise<string> {
    const encryptedPassword = await bcrypt.hashSync(password, Number(process.env.ROUNDS));
    return encryptedPassword;
  }

  private generateCode(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  async verifyUser(validateDto: ValidateDto) {
    const {code, userId} = validateDto;
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          id: userId,
          verificationCode: code,
          isValidated: false,
          isActive: true
        }
      });

      if (!user) {
        this.logger.error("User not found or invalid validation code");
        throw new NotFoundException("User not found or invalid validation code");
      }

      const userValidated = await this.dbService.user.update({
        where: {
          id: userId,
          isActive: true,
          isValidated: false
        }, 
        data: {
          isValidated: true,
          verificationCode: null
        }
      });

      

      return {
        message: 'User validated Succesfully'
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(`User not found or invalid validation code: ${error.message}`);
        throw new NotFoundException(error.message)
      }
      else {
        this.logger.error(`User not found or invalid validation code: ${error.message}`);
        throw new InternalServerErrorException(error.message)
      } 
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
