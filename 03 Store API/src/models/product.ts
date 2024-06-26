import { Schema, model } from 'mongoose';

export type ProductType = {
  name: string;
  price: number;
  featured: boolean;
  rating: number;
  createdAt: Date;
  company: 'ikea' | 'liddy' | 'caressa' | 'marcos';
};

const ProductSchema = new Schema<ProductType>({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported',
    },
    // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
  },
});

export const Product = model<ProductType>('Product', ProductSchema);
