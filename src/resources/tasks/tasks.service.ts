import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import { PrismatasksRepository } from './repositories/prisma/PrismaTasksRepository';
import { TaskEntity } from './task.entity';

interface Task {
    title: string;
    description?: string;
    completedAt?: Date;
}

@Injectable()
export class TasksService {
    constructor(
        private tasksRepository: PrismatasksRepository,
    ) { }

    async create({ title, description }: Task) {
        if (!title) {
            throw new Error('Title is required.')
        }

        if (!description) {
            throw new Error('description is required.')
        }

        await this.tasksRepository.create({
            id: randomUUID(),
            title,
            description,
        })
    }

    async createCSV(file) {
        
    }

    async findAll() {
        const tasks = await this.tasksRepository.findAll()

        return tasks
    }

    async findUnique(id: string) {
        const task = await this.tasksRepository.findUnique(id)

        if (!task) {
            throw new BadRequestException('Task not found.')
        }

        return task
    }

    async update(id: string, datatask: TaskEntity) {
        const task = await this.tasksRepository.update(id, datatask)

        if (!datatask) {
            throw new Error('DataTask is required.')
        }

        return task;
    }

    async delete(id: string) {
        const task = await this.tasksRepository.delete(id)
    }
}
