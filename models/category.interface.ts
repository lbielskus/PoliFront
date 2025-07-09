import { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  customId: string;
  name: string;
  parent: Schema.Types.ObjectId | ICategory | null;
  images: string[];
  description: string;
}
