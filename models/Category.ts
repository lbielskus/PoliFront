import mongoose, { Schema, Model } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new mongoose.Schema({
  customId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  images: [{ type: String }],
  description: {
    type: String,
    default: '',
  },
});

const CategoryModel: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>('Category', categorySchema);

export default CategoryModel;
