// import crypto from 'node:crypto';
// import { CreateTaskData, TasksRepository } from "../../src/resources/tasks/repositories/task.repository";

// export class InMemorytasksRepository implements TasksRepository {
//     public items: any = []

//     async create(data: CreateTaskData) {
//         this.items.push({
//             id: crypto.randomUUID(),
//             title: data.title,
//             description: data.description,
//             completedAt: new Date(data.completedAt) ?? null
//         });
//     }

//     async findAll() {
//         this.items
//     }
// }