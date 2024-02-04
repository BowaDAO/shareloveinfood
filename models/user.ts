import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    refreshToken: String,

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetTokenExpires: Date,
  },

  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generatePasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 15 * 60 * 1000; //Email verification expires token/link in 15 minutes.

  return token;
};

const User = models.User || model("User", UserSchema);

export default User;
