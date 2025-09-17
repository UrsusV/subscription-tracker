import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
  res.send('Sign up');
});

authRouter.post('/sign-in', (req, res) => {
  res.send('Sign in');
});



export default authRouter;