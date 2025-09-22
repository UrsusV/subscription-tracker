import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({title: "Get all users"});
});

userRouter.get('/:id', (req, res) => {
    res.send({title: "Get user by id"});
});

userRouter.post('/', (req, res) => {
    res.send({title: "Create user"});
});

userRouter.put('/:id', (req, res) => {
    res.send({title: "Update user by id"});
});

userRouter.delete('/:id', (req, res) => {
    res.send({title: "Delete user by id"});
});


export default userRouter;
