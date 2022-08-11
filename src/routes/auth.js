import { Router } from 'express';
import passport from 'passport';

import userModule from '../modules/user.js';
import {createHash} from 'crypto'

export const router = Router();

router
.post('/signup',
async (req, res) => {
  const {email, password, name, contactPhone} = req.body;
  try {
    const user = await userModule.findByEmail(email);
    if (user) {
      return res.json({
        error: 'Пользователь уже существует',
        status: 'error',
      });
    }

    const passwordHash = createHash('md5').update(password).digest('hex');

    const newUser = await userModule.create({
      name,
      passwordHash,
      email,
      contactPhone,
    });
    return res.json({
      data: newUser,
      status: 'ok',
    });
  } catch (error) {
    return res.json({
      error,
      status: 'error',
    });
  }
})
.post('/signin',
passport.authenticate('signin'),
(req, res) => {
  return res.json({
    data: req.user,
    status: 'ok',
  })
});