import { Router } from 'express';
import advertisementModule from '../modules/advertisement'

export const router = Router();

router
.get('/', async (req, res) => {
  try {
    const advertisement = await advertisementModule.find()
    res.json({data: advertisement, status: 'ok'})
  } catch (error) {
    res.json({error, status: 'error'})
  }
})
.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const advertisement = await advertisementModule.find(id)
    res.json({data: advertisement, status: 'ok'})
  } catch (error) {
    res.json({error, status: 'error'})
  }
})
.post('/', async (req, res) => {
  try {
    const data = req.body;
    const advertisement = await advertisementModule.create(data)
    res.json({data: advertisement, status: 'ok'})
  } catch (error) {
    res.json({error, status: 'error'})
  }
})
.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const advertisement = await advertisementModule.remove(id)
    res.json({data: advertisement, status: 'ok'})
  } catch (error) {
    res.json({error, status: 'error'})
  }
})
