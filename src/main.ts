import * as dotenv from 'dotenv';
dotenv.config(); // Load .env file immediately

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Campaign } from './campaigns/schemas/campaign.schema';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Pre-populate campaigns
  const campaignModel = app.get(getModelToken(Campaign.name));
  const count = await campaignModel.countDocuments();
  if (count === 0) {
    const sampleCampaigns = [
      {
        name: 'Campaign 1',
        status: 'active',
        type: 'type1',
        startDate: new Date(),
        budget: 1000,
        category: 'category1',
      },
      {
        name: 'Campaign 2',
        status: 'inactive',
        type: 'type2',
        startDate: new Date(),
        budget: 2000,
        category: 'category2',
      },
    ];
    await campaignModel.insertMany(sampleCampaigns);
    console.log('Pre-populated database with sample campaigns:', sampleCampaigns);
  } else {
    console.log('Database already contains campaigns; skipping pre-population.');
  }

  await app.listen(3000);
}
bootstrap();