import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  bio?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Campaign' }] })
  joinedCampaigns: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);