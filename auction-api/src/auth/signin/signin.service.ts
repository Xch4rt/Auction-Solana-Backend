import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateSignInDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class SignInService {
  constructor (private readonly dbService: PrismaService,
               private readonly jwtService: JwtService) {}
  
  private readonly logger = new Logger(SignInService.name);

  async login (createSignInDto: CreateSignInDto) {
    const { username, password } = createSignInDto;
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          username,
          isActive: true,
          isValidated: true
        }
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!this.validateUser(password, user.password)) {
        throw new UnauthorizedException('Wrong Credentials');  
      } 

      const tokens = await this.getTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        userId: user.id,
        token: tokens
      }

    } catch (error) {
      if (error instanceof UnauthorizedException) {
        this.logger.error(`Error with the login: ${error.message}`);
        throw new UnauthorizedException(error.message);
      } else if (error instanceof NotFoundException) {
        this.logger.error(`Error with the login: ${error.message}`);
        throw new NotFoundException(error.message)
      }
      else {
        this.logger.error(`Error with the user login process: ${error.message}`);
        throw new InternalServerErrorException(error.message)
      } 
    }
  }

  async refreshToken (refreshToken_: RefreshTokenDto) {
    const { userId, refreshToken} = refreshToken_;
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          id: userId,
          isActive: true,
          isValidated: true
        }
      });

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Access Denied');
      }

      const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

      if (!refreshToken) {
        throw new UnauthorizedException('Access Denid');
      }

      const tokens = await this.getTokens(user.id, user.username);
      
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        this.logger.error(`Error with the login: ${error.message}`);
        throw new UnauthorizedException(error.message);
      }
      else {
        this.logger.error(`Error with the user login process: ${error.message}`);
        throw new InternalServerErrorException(error.message)
      } 
    }
  }
  
  private async validateUser (body_password: string, user_password: string): Promise<Boolean> {
    return await bcrypt.compare(body_password, user_password);
  }

  private async updateRefreshToken (userId: number, refreshToken: string) {
    const hashedRefreshedToken = await bcrypt.hashSync(refreshToken, Number(process.env.ROUNDS));
    await this.dbService.user.update({
      where: {
        id: userId,
        isActive: true,
        isValidated: true
      },
      data: {
        refreshToken: hashedRefreshedToken
      }
    });
  }

  private async getTokens (userId: number, username: string) {
      const [accessToken, refreshToken ] = await Promise.all([
        this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '30m'
        }
        ),
        this.jwtService.signAsync(
          {
            sub: userId,
            username
          },
          {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '5d'
          }
        )
      ]);

      return {
        accessToken,
        refreshToken
      }
  }
}
