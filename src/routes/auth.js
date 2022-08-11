import { Router } from 'express';
import passport from 'passport';
import userModule from '../modules/user.js';

export const router = Router();

router
.post('/signup',
async (req, res) => {
  try {
    const newUser = await userModule.create(req.body);
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