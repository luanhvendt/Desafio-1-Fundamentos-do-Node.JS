import { TaskEntity } from "../task.entity";

export interface CreateTaskData {
    id: string;
    title: string;
    description?: string;
    completedAt?: Date;
}

export interface TasksRepository {
    create(data: CreateTaskData): Promise<void>
    createCSV(file: any): Promise<void>
    findAll(): Promise<CreateTaskData[]>
    findUnique(id: string): Promise<CreateTaskData>
    update(id: string, dataTask: TaskEntity): Promise<TaskEntity>
    delete(id: string): Promise<void>
}