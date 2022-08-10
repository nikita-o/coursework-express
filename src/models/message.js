import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const { ObjectId } = Schema.Types;

export const messageSchema = new Schema({
  author: { type: ObjectId, required: true,   unique: false },
  sentAt: { type: Date,     required: true,   unique: false },
  text:   { type: String,   required: true,   unique: false },
  readAt: { type: Date,     required: false,  unique: false },
});

export const messageModel = model('Message', messageSchema);