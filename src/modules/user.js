import { userModel } from '../models/user.js';

function create(data) {
  const {email, password, name, contactPhone} = data;
  try {
    const user = await userModule.findByEmail(email);
    if (user) {
      throw {
        error: 'Пользователь уже существует',
        status: 'error',
      }
    }
    const passwordHash = createHash('md5').update(password).digest('hex');
    const newUser = new userModel({
      name,
      passwordHash,
      email,
      contactPhone,
    });
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
