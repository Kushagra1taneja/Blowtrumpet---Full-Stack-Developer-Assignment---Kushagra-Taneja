import { Controller, Get, Post, Param, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CampaignsService } from './campaigns.service';
import { Request, Response } from 'express';

@Controller('api/campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  async getCampaigns(@Req() req: Request, @Res() res: Response) {
    const status = req.query.status as string;
    const category = req.query.category as string;
    const campaigns = await this.campaignsService.getCampaigns({ status, category });
    return res.json(campaigns);
  }

  @Get(':campaignId')
  async getCampaign(@Param('campaignId') campaignId: string, @Res() res: Response) {
    const campaign = await this.campaignsService.getCampaignById(campaignId);
    if (!campaign) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Campaign not found' });
    }
    return res.json(campaign);
  }

  @Post(':campaignId/join')
  @UseGuards(AuthGuard('jwt'))
  async joinCampaign(@Param('campaignId') campaignId: string, @Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'User not authenticated' });
    }
    await this.campaignsService.joinCampaign(user._id.toString(), campaignId);
    return res.json({ success: true, message: 'Joined campaign successfully' });
  }

  @Post(':campaignId/leave')
  @UseGuards(AuthGuard('jwt'))
  async leaveCampaign(@Param('campaignId') campaignId: string, @Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'User not authenticated' });
    }
    await this.campaignsService.leaveCampaign(user._id.toString(), campaignId);
    return res.json({ success: true, message: 'Left campaign successfully' });
  }
}