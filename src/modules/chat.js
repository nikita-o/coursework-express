import { chatModel } from '../models/chat.js'
import { messageModel } from '../models/message.js'
import { EventEmitter } from 'events'

const sendMessageEvent = new EventEmitter()

export function find(users) {
  try {
    const chat = chatModel.findOne(users);
    return chat;
  } catch (error) {
    console.error(error);
  }
}

export async function sendMessage(data) {
  try {
    const {author, receiver, text} = data;

    const message = new messageModel({
      author: author,
      sentAt: Date.now(),
      text: text,
    });

    let chat = await chatModel.findOne({ users: [author, receiver] });
    if (!chat) {
      chat = new chatModel({
        users: [author, receiver],
        createdAt: Date.now(),
      });
    }
    chat.messages.push(message);
    chat.save();

    sendMessageEvent.emit('send-message', {
      chatId: chat._id,
      message,
    });

    return message;

  } catch (error) {
    console.error(error);
  }
}

export function subscribe(callback) {
  sendMessageEvent.on('send-message', (args) => {
    callback(args);
  });
}

export function getHistory(id) {
  try {
    const messages = chatModel.findById(id, 'messages');
    return messages;
  } catch (error) {
    console.error(error);
  }
}

export default {getHistory, subscribe, sendMessage, find}
