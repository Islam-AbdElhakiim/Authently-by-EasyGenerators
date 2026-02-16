import { Controller, Request, Post, UseGuards, Body, Get, Res, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: Response
  ) {
    this.logger.debug(`User ${req.user.email} logged in successfully`);

    const { access_token, ...result } = await this.authService.login(req.user);
    // httpOnly cookie (longer when rememberMe is true)
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: req.body.rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 7 days if rememberMe is true, otherwise 24 hours
      path: '/',
    });

    return result;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    this.logger.debug(`Registering user with email: ${registerDto.email}`);
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    this.logger.debug(`Fetching profile for user: ${req.user.email}`);
    return "Hiiiii";
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.logger.debug(`Logging out user`);
    response.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }
}