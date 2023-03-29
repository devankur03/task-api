import { Request, Response, Router } from 'express';
import { TaskController } from './task.controller';

export const taskRouter: Router = Router();

taskRouter.get('/tasks', async (req: Request, res: Response) => {
    const taskController = new TaskController();
    const taskData = await taskController.getAllTasks();
    res.json(taskData).status(200);
});
