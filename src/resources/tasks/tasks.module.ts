import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismatasksRepository } from './repositories/prisma/PrismaTasksRepository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';


@Module({
    imports: [MulterModule.register(
        {
            dest: './uploads'
        }
    )],
    controllers: [TasksController],
    providers: [TasksService, PrismatasksRepository],
})
export class TasksModule { }
