import { instanceToPlain } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../..';
import { Task } from './task.entity';

// type statuTypes = {
//     task_status: string;
//     count: string;
// };

export class TaskController {
    constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

    public async getAllTasks(): Promise<any> {
        let allTasks: Task[];
        let statusObj: any = {};

        try {
            const countInfo = await this.taskRepository
                .createQueryBuilder('task')
                .select('task.status')
                .addSelect('COUNT(task.status)', 'count')
                .groupBy('task.status')
                .getRawMany();

            console.log(countInfo);

            allTasks = await this.taskRepository.find();
            allTasks = instanceToPlain(allTasks) as Task[];

            if (countInfo.length) {
                for (let item of countInfo) {
                    statusObj[item.task_status] = item.count;
                }
            }

            return {
                statusCounts: statusObj,
                tasks: allTasks,
            };
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
            console.log(e);
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

        if (taskDetails) {
            return await this.taskRepository.delete(id);
        } else {
            throw new Error('Error');
        }
    }
}
