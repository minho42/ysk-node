import mongoose from "mongoose";

const currencySchema = new mongoose.Schema(
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

export const Currency = mongoose.model("Currency", currencySchema);
