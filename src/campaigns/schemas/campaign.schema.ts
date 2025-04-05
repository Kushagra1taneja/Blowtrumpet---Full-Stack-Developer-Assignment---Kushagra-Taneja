import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Campaign extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  category: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);