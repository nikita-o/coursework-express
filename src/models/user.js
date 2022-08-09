import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email:        { type: String, required: true,   unique: true },
  passwordHash: { type: String, required: true,   unique: false },
  name:         { type: String, required: true,   unique: false },
  contactPhone: { type: String, required: false,  unique: false },
});

export const userModel = model('User', userSchema);