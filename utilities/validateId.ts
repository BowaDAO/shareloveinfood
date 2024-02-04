import mongoose from "mongoose";

export const validateId = (id: string) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    throw new Error("invalid id");
  }
};
