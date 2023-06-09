import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  AuthGoogle,
  AuthLogin,
  AuthRegister,
  AuthUpdateToken,
  AuthVk,
} from '@kinopoisk-snitch/contracts';
import { LoginDto, LoginDtoResponse } from './dto/login.dto';
import { RegisterDto, RegisterDtoResponse } from './dto/register.dto';
import {
  authGoogleRMQConfig,
  authLoginRMQConfig,
  authRegisterRMQConfig,
  authUpdateToken,
  authVkRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { VkOauthGuard } from '../guards/vk-oauth.guard';
import { PassportTokenErrorFilter } from '../exceptions-filters/oauth-exceptions';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BAD_REQUEST,
  TOKEN_UNVERIFIED,
  USER_NOT_FOUND,
} from '@kinopoisk-snitch/constants';
import { UpdateTokenDto } from './dto/update-token.dto';

@ApiTags('Auth')
@Controller('/auth')
@UsePipes(new ValidationPipe())
export class AuthCommands {
  constructor(private readonly amqpService: AmqpConnection) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: RegisterDtoResponse,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: BAD_REQUEST })
  async register(@Body() registerDto: RegisterDto) {
    return this.amqpService.request<AuthRegister.Response>({
      ...authRegisterRMQConfig(),
      payload: registerDto,
    });
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LoginDtoResponse,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: USER_NOT_FOUND })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.amqpService.request<AuthLogin.Response>({
      ...authLoginRMQConfig(),
      payload: loginDto,
    });
    if (user.error) {
      throw user.error['response'];
    }
    return user;
  }

  @Get('/google')
  @ApiOperation({ summary: 'Login or register via google' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LoginDtoResponse,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: USER_NOT_FOUND })
  @UseGuards(GoogleOauthGuard)
  @UseFilters(new PassportTokenErrorFilter())
  async google(@Req() googleUser) {
    const { user } = googleUser;
    return this.amqpService.request<AuthGoogle.Response>({
      ...authGoogleRMQConfig(),
      payload: user,
    });
  }

  @Get('/vk')
  @ApiOperation({ summary: 'Login or register via vk' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LoginDtoResponse,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: USER_NOT_FOUND })
  @UseGuards(VkOauthGuard)
  @UseFilters(new PassportTokenErrorFilter())
  async vk(@Req() vkUser) {
    const { user } = vkUser;
    return this.amqpService.request<AuthVk.Response>({
      ...authVkRMQConfig(),
      payload: user,
    });
  }

  @Patch('/updateToken')
  @ApiOperation({ summary: 'Updates access and refresh tokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UpdateTokenDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: TOKEN_UNVERIFIED,
  })
  async updateToken(@Body() data: UpdateTokenDto) {
    const refresh_token = data.refresh_token;
    const updated_token =
      await this.amqpService.request<AuthUpdateToken.Response>({
        ...authUpdateToken(),
        payload: { refresh_token: refresh_token },
      });
    if (updated_token.error) {
      throw updated_token.error['response'];
    }
    return updated_token;
  }
}
