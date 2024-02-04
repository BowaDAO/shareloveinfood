import { Schema, model, models, Types } from "mongoose";

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  images: {
    type: [],
    required: true,
  },

  provider: {
    type: Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
  },

  recipient: {
    type: Types.ObjectId,
    ref: "User",
  },
}, );

const Item = models.Item || model("Item", ItemSchema);

export default Item;
