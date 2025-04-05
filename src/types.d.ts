import { User } from './auth/schemas/user.schema';
import { Types } from 'mongoose';

declare module 'express' {
  interface Request {
    user?: User & { _id: Types.ObjectId }; // Explicitly include _id as ObjectId
  }
}