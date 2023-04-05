import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
    })
    title: string;

    @Column({
        type: 'longtext',
    })
    description: string;

    @Column({
        type: 'text',
    })
    date: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.Todo,
    })
    status: Status;

    @Column({
        type: 'enum',
        enum: Priority,
        default: Priority.Low,
    })
    priority: Priority;
}
