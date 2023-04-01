import { Request, Response, Router } from 'express';
import { TaskController } from './task.controller';
import { createValidator } from './task.validator';

export const taskRouter: Router = Router();

taskRouter.get('/tasks', async (req: Request, res: Response) => {
    const taskController = new TaskController();
    const taskData = await taskController.getAllTasks();
    res.json(taskData).status(200);
});

taskRouter.post(
    '/create',
    createValidator,
    async (req: Request, res: Response) => {
        console.log(Object.keys(req.body), req.params, 'Test create');
        const taskController = new TaskController();
        const newTaskData = await taskController.addNewTask(req.body);
        res.status(201).json(newTaskData);
    },
);

taskRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const taskController = new TaskController();
        const updatedData = await taskController.updateTask(
            req.params.id,
            req.body,
        );
        res.status(200).json(updatedData);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: 'Invalid id' });
    }
});

taskRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const taskController = new TaskController();
        const result = await taskController.deleteTask(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({ msg: 'Invalid id' });
    }
});
