import { Router } from 'express';
import advertisementModule from '../modules/advertisement.js';
import multer from 'multer';
import {storage, fileFilter} from '../multer/multer.js';
import { isAuth } from '../middlewares/auth.js';


export const router = Router();

router
.get('/', async (req, res) => {
  try {
    const advertisement = await advertisementModule.find(req.params)
    res.json({data: advertisement, status: 'ok'})
  } catch (error) {
    res.json({error, status: 'error'})
  }
})
.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const advertisement = await advertisementModule.findById(id)
    res.json({data: advertisement, status: 'ok'})
  } catch (error) {
    res.json({error, status: 'error'})
  }
})
.post('/',
isAuth,
multer({ storage, fileFilter }).fields([{ name: 'images' }]),
async (req, res) => {
  try {
    const data = req.body;

    data.images = req?.files?.images.map(image => image.path);

    const advertisement = await advertisementModule.create(data);
    res.json({data: advertisement, status: 'ok'});
  } catch (error) {
    res.json({error, status: 'error'})
  }
})
.delete('/:id',
isAuth,
async (req, res) => {
  try {
    const { id } = req.params;
    const advertisement = await advertisementModule.findById(req.params.id);

    if (!req.user._id.equals(advertisement.userId)) {
      res.status(403).json({
        error: 'Пользователь не является автором объявления',
        status: 'error',
      });
    }

    await advertisementModule.remove(id);
    res.json({data: id, status: 'ok'})
  } catch (error) {
    res.json({error, status: 'error'})
  }
})
