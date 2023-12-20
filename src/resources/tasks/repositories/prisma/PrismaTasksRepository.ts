import { prisma } from "../../../../database/PrismaService";
import { TaskEntity } from "../../task.entity";
import { CreateTaskData, TasksRepository } from "../task.repository";
import { readFileSync } from 'fs';

export class PrismatasksRepository implements TasksRepository {
    async create(data: CreateTaskData) {
        await prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
            }
        })
    }

    async createCSV(file): Promise<void> {
        
    }

    async findAll(): Promise<CreateTaskData[]> {
        const tasks = await prisma.task.findMany()

        return tasks
    }

    async findUnique(id: string): Promise<CreateTaskData> {
        const task = await prisma.task.findUnique({
            where: {
                id,
            }
        })


        return task
    }

    async update(id: string, datatask: TaskEntity): Promise<CreateTaskData> {
        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                title: datatask.title,
                description: datatask.description,
                completedAt: datatask.completedAt,
            }
        })

        return task
    }

    async delete(id: string) {
        const task = await prisma.task.delete({
            where: {
                id,
            }
        })
    }
}