import { TaskEntity } from '@/resources/tasks/task.entity';
import { CreateTaskData, TasksRepository } from "../../src/resources/tasks/repositories/task.repository";

export class InMemorytasksRepository implements TasksRepository {
    public items: any = []

    async create(data: CreateTaskData) {
        const task: CreateTaskData = {
            id: '1',
            title: data.title,
            description: data.description,
            completedAt: new Date(data.completedAt) ?? null
        };

        this.items.push(task)
        return task
    }

    async createCSV(file: any): Promise<void> {

    }

    async findAll() {
        return this.items
    }

    async findUnique(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                return this.items[i]
            }
        }
    }

    async update(id: string, dataTask: TaskEntity) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items[i].title = dataTask.title;
                this.items[i].description = dataTask.description;
                this.items[i].completedAt = dataTask.completedAt;

                return this.items[i]
            }
        }
    }

    async delete(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
            }
        }
    }
}
