import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  role: { type: String, required: true },          // athlete/admin
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  age: Number,
  gender: String,
  sport: String,
  state: String,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;
