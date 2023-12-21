import { BadGatewayException } from "@nestjs/common";
import { readFileSync } from "fs";
import { prisma } from "../../../../database/PrismaService";
import { TaskEntity } from "../../task.entity";
import { CreateTaskData, TasksRepository } from "../task.repository";

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
        let createdTask = [];
        let titles = [];

        console.log(file)

        const csvFile = await readFileSync(`./uploads/${file.filename}`)

        const lines = csvFile.toString().split('\n')
        let isFirstLine = true;
        let isError = false;

        for (const line of lines) {
            const task = line.split(',')

            if (!isFirstLine) {
                const existTasks = await prisma.task.findFirst({
                    where: {
                        title: task[0].trim(),
                    },
                })

                if (existTasks) {
                    isError = true;
                    titles.push(existTasks.title)
                    break
                }
                else {
                    createdTask.push(
                        await prisma.task.create({
                            data: {
                                title: task[0].trim(),
                                description: task[1].trim(),
                            },
                        })
                    )
                }
            }
            isFirstLine = false;
        }
        if (isError) {
            throw new BadGatewayException('')
        }
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