import mongoose, { Schema } from 'mongoose';

const MediaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: [{ type: String }],
  firstBanner: {
    type: Boolean,
    default: false,
  },
  secondBanner: {
    type: Boolean,
    default: false,
  },
  route: {
    type: String,
    default: '',
  },
});

let MediaModel;

try {
  MediaModel = mongoose.model('Media');
} catch {
  MediaModel = mongoose.model('Media', MediaSchema);
}

export default MediaModel;
