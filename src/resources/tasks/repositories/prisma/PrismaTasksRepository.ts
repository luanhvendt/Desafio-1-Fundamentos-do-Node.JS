import { BadRequestException, Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { PrismaService } from "../../../../database/PrismaService";
import { TaskEntity } from "../../task.entity";
import { CreateTaskData, TasksRepository } from "../task.repository";

// let prisma: PrismaService
@Injectable()
export class PrismaTasksRepository implements TasksRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateTaskData) {
        const task = await this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
            }
        })

        return task
    }

    async createCSV(file): Promise<void> {
        let createdTask = [];
        let titles = [];

        const csvFile = await readFileSync(`./uploads/${file.filename}`)

        const lines = csvFile.toString().split('\n')
        let isFirstLine = true;
        let isError = false;

        for (const line of lines) {
            const task = line.split(',')

            if (!isFirstLine) {
                const existTasks = await this.prisma.task.findFirst({
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
                        await this.prisma.task.create({
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
            throw new BadRequestException(`Tasks already exists.`)
        }
    }

    async findAll(): Promise<CreateTaskData[]> {
        const tasks = await this.prisma.task.findMany()
        return tasks
    }

    async findUnique(id: string): Promise<CreateTaskData> {
        const task = await this.prisma.task.findUnique({
            where: {
                id,
            }
        })


        return task
    }

    async update(id: string, datatask: TaskEntity): Promise<CreateTaskData> {
        const task = await this.prisma.task.update({
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
        const task = await this.prisma.task.delete({
            where: {
                id,
            }
        })
    }
}