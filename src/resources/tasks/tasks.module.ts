import { PrismaService } from '../../database/PrismaService';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaTasksRepository } from './repositories/prisma/PrismaTasksRepository';
import { TasksRepository } from './repositories/task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    controllers: [TasksController],
    providers: [
        TasksService,
        PrismaService,
        PrismaTasksRepository,
        { provide: TasksRepository, useClass: PrismaTasksRepository },
    ],
})

// @Module({
//     imports: [MulterModule.register({
//         dest: './uploads'
//     })
//     ],
//     controllers: [TasksController],
//     providers: [TasksService]

// })
export class TasksModule { }


