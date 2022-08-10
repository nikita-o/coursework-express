import { userModel } from '../models/user';

export function create(data) {
  try {
    const newUser = new userModel(data);
    return newUser.save()
  } catch (error) {
    console.error(error);
  }
}

export function findByEmail(email) {
  try {
    const user = userModel.findOne({ email }).select('-__v');
    return user;
  } catch (error) {
    console.error(error);
  }
}

export function findById(id) {
  try {
    const user = userModel.findById(id);
    return user;
  } catch (error) {
    console.error(error);
  }
}
