import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { TasksRepository } from './repositories/task.repository';
import { TaskEntity } from './task.entity';

interface Task {
    title: string;
    description?: string;
    completedAt?: Date;
}

@Injectable()
export class TasksService {
    constructor(
        private tasksRepository: TasksRepository,
    ) { }

    async create({ title, description }: Task) {
        if (!title) {
            throw new Error('Title is required.')
        }

        if (!description) {
            throw new Error('description is required.')
        }

        const task = await this.tasksRepository.create({
            id: '1',
            title,
            description,
        })

        return task
    }

    async createCSV(file: Express.Multer.File): Promise<void> {
        try {
            await this.tasksRepository.createCSV(file);
        } catch (error) {
            if (error instanceof BadGatewayException) {
                console.error('Erro na criação do CSV:', error.message);
            } else {
                console.error('Erro desconhecido na criação do CSV:', error);
            }
            throw error;
        }
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

        return task
    }
}
