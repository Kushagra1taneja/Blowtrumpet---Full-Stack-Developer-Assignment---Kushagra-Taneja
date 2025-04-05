import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getCampaigns(filters: { status?: string; category?: string }): Promise<Campaign[]> {
    const query: any = {};
    if (filters.status) query.status = filters.status;
    if (filters.category) query.category = filters.category;
    return this.campaignModel.find(query).exec();
  }

  async getCampaignById(campaignId: string): Promise<Campaign | null> {
    return this.campaignModel.findById(campaignId).exec();
  }

  async joinCampaign(userId: string, campaignId: string): Promise<void> {
    const campaign = await this.campaignModel.findById(campaignId);
    if (!campaign) {
      throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user.joinedCampaigns.includes(campaignId as any)) {
      user.joinedCampaigns.push(campaignId as any); // Add campaign to user's joined list
      await user.save();
    }
  }

  async leaveCampaign(userId: string, campaignId: string): Promise<void> {
    const campaign = await this.campaignModel.findById(campaignId);
    if (!campaign) {
      throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.joinedCampaigns = user.joinedCampaigns.filter((id) => id.toString() !== campaignId);
    await user.save();
  }
}