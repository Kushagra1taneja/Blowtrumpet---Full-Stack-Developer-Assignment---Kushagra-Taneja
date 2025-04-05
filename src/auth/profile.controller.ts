import { Controller, Get, Put, Body, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('api/profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getProfile(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (!user) return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'User not authenticated' });
    return res.json({ success: true, user });
  }

  @Put()
  async updateProfile(@Req() req: Request, @Body() body: UpdateProfileDto, @Res() res: Response) {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'User not authenticated' });
    }
    const updatedUser = await this.authService.updateProfile(user._id.toString(), body);
    return res.json({ success: true, user: updatedUser });
  }
}