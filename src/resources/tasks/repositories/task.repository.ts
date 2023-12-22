import { TaskEntity } from "../task.entity";

export interface CreateTaskData {
    id: string;
    title: string;
    description?: string;
    completedAt?: Date;
}

export abstract class TasksRepository {
    abstract create(data: CreateTaskData): Promise<void>
    abstract createCSV(file: any): Promise<void>
    abstract findAll(): Promise<CreateTaskData[]>
    abstract findUnique(id: string): Promise<CreateTaskData>
    abstract update(id: string, dataTask: TaskEntity): Promise<TaskEntity>
    abstract delete(id: string): Promise<void>
}