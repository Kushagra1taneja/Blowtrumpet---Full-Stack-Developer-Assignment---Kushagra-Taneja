import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string), // Trust that MONGO_URI is defined
    AuthModule,
    CampaignsModule,
  ],
})
export class AppModule {}