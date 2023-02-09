import mongoose from "mongoose";

export interface ICurrency {
  name: string;
  rate: number;
  realRate: number;
  fee: number;
  url: string;
  note: string;
  created: Date;
  updated: Date;
}


const currencySchema = new mongoose.Schema<ICurrency>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      default: 0,
    },
    realRate: {
      type: Number,
      required: true,
      default: 0,
    },
    fee: {
      type: Number,
      required: true,
      default: 0,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

export const Currency = mongoose.model<ICurrency>("Currency", currencySchema);
