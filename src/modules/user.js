import { userModel } from '../models/user.js';

function create(data) {
  try {
    const newUser = new userModel(data);
    return newUser.save()
  } catch (error) {
    console.error(error);
  }
}

function findByEmail(email) {
  try {
    const user = userModel.findOne({ email }).select('-__v');
    return user;
  } catch (error) {
    console.error(error);
  }
}

function findById(id) {
  try {
    const user = userModel.findById(id);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export default {create, findByEmail, findById }
