import { instanceToPlain } from 'class-transformer';
import { DeleteResult } from 'typeorm';
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
            throw new Error('Error');
        }
    }

    public async addNewTask(detils: Task): Promise<Task> {
        let taskInfo: Task = new Task();
        const { title, description, date, status, priority } = detils;
        taskInfo.title = title;
        taskInfo.description = description;
        taskInfo.priority = priority;
        taskInfo.date = date;
        taskInfo.status = status;

        try {
            taskInfo = await this.taskRepository.save(taskInfo);
            taskInfo = instanceToPlain(taskInfo) as Task;
            return taskInfo;
        } catch (e) {
            throw new Error('Error ');
        }
    }

    public async updateTask(id: string, details: any): Promise<Task> {
        const taskDetails: any = await this.taskRepository.findOneBy({
            id,
        });
        console.log(taskDetails);
        if (taskDetails) {
            const updatedTask = { ...taskDetails, ...details };
            const newTask = await this.taskRepository.save(updatedTask);
            return newTask;
        } else {
            throw new Error('Error');
        }
    }

    public async deleteTask(id: string): Promise<DeleteResult> {
        const taskDetails: any = await this.taskRepository.findOneBy({
            id,
        });
        console.log(taskDetails);
        if (taskDetails) {
            return await this.taskRepository.delete(id);
        } else {
            throw new Error('Error');
        }
    }
}
