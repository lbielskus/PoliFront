import mongoose, { model, Schema, models } from 'mongoose';

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
});

export const Blog = models.Blog || model('Blog', BlogSchema);
