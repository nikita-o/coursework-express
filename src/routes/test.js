import { Router } from 'express';

export const router = Router();

router
.get('/', (req, res) => {
  console.log(req.params);
  res.json(true);
})
.post('/', (req, res) => {
  console.log(req.body);
  res.json(true);
})