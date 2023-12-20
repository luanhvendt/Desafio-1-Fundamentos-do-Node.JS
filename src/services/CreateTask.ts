// import crypto from 'node:crypto';
// import { TasksRepository } from "../resources/tasks/repositories/task.repository";

// interface CreateTaskRequest {
//     title: string;
//     description?: string;
// }

// export class CreateTask {
//     constructor(
//         private tasksRepository: TasksRepository,
//     ) { }

//     async execute({ title, description }: CreateTaskRequest) {
//         if (!title) {
//             throw new Error('Title is required.')
//         }

//         if (!description) {
//             throw new Error('description is required.')
//         }

//         await this.tasksRepository.create({
//             id: crypto.randomUUID(),
//             title,
//             description,
//         })
//     }
// }