import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { csvFileFilter, csvFileName } from "../../utils/csvUtils";
import { TaskEntity } from "./task.entity";
import { TasksService } from "./tasks.service";

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly taskService: TasksService,
    ) { }

    @Post()
    @HttpCode(201)
    create(@Body() TaskEntity: TaskEntity) {
        return this.taskService.create(TaskEntity)
    }

    @Post('/csv')
    @HttpCode(201)
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './uploads',
            filename: csvFileName
        },
        ),
        fileFilter: csvFileFilter,
    }))
    createCSV(@UploadedFile() file: Express.Multer.File) {
        return this.taskService.createCSV(file);
    }

    @Get()
    @HttpCode(200)
    findAll() {
        return this.taskService.findAll()
    }

    @Get(':id')
    @HttpCode(200)
    findUnique(@Param('id') id: string) {
        return this.taskService.findUnique(id)
    }

    @Put(':id')
    @HttpCode(200)
    update(@Param('id') id: string, @Body() datatask: TaskEntity) {
        return this.taskService.update(id, datatask)
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string) {
        return this.taskService.delete(id)
    }
}