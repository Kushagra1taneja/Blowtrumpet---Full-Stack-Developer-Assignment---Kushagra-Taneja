import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(body);
      return res.status(HttpStatus.CREATED).json({ success: true, user });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      const { username, password } = body;
      const token = await this.authService.login(username, password);
      return res.json({ success: true, token });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: error.message });
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return res.json({ success: true, message: 'Logged out successfully' });
  }
}