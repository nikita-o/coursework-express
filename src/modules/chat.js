import { chatModel } from '../models/chat'
import { messageModel } from '../models/message'

export function find(users) {
  try {
    const chat = chatModel.findOne({ users });
    return chat;
  } catch (error) {
    console.error(error);
  }
}

export function sendMessage(data) {
  try {
    // TODO:
    const {author, receiver, text} = data;

    const message = new messageModel({
      author: author,
      sentAt: Date.now(),
      text: text,
    }).save();

    let chat = await chatModel.findOne({ users: [author, receiver] });
    if (!chat) {
      chat = new chatModel({
        users: [author, receiver],
        createdAt: Date.now(),
      });
    }
    chat.messages.push(message)
    chat.save()
    return message;

  } catch (error) {
    console.error(error);
  }
}

export function subscribe(params) {
  try {
    // TODO:
  } catch (error) {
    console.error(error);
  }
}

export function getHistory(id) {
  try {
    const messages = chatModel.findById(id, 'messages');
    return messages;
  } catch (error) {
    console.error(error);
  }
}