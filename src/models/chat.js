import mongoose from 'mongoose';
const { model, Schema } = mongoose;

import { messageSchema } from './message'

const { ObjectId } = Schema.Types;

const chatSchema = new Schema({
  users:      { type: [ObjectId],       required: true,   unique: false },
  createdAt:  { type: Date,             required: true,   unique: false },
  messages:   { type: [messageSchema],  required: false,  unique: false },
});

export const chatModel = model('Message', chatSchema);