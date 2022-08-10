import { Router } from 'express';

export const router = Router();

router
.post('/signup',
passport.authenticate('signup'),
(req, res) => {
  return res.json({
    data: req.user,
    status: 'ok',
  })
})
.post('/signin',
passport.authenticate('signin'),
(req, res) => {
  return res.json({
    data: req.user,
    status: 'ok',
  })
});