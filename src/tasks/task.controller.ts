import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../..';
import { Task } from './task.entity';

export class TaskController {
    constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

    public async getAllTasks(): Promise<Task[]> {
        let allTasks: Task[];

        try {
            allTasks = await this.taskRepository.find();
            allTasks = instanceToPlain(allTasks) as Task[];
            return allTasks;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}
