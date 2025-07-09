import { model, models, Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    line_items: Object,
    name: String,
    email: String,
    city: String,
    zip: String,
    address: String,
    country: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model('Order', OrderSchema);
