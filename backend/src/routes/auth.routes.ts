import express from 'express';
import login from "../controller/auth.controller";
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Auth route working' });
});

router.post('/', login);

export default router;
