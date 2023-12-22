import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { InMemorytasksRepository } from '../../../test/repositories/InMemoryTasksRepository'
import { AppModule } from '../../app.module'
import { PrismaService } from '../../database/PrismaService'
import { TasksModule } from './tasks.module'
import { TasksService } from './tasks.service'

describe('TasksController', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, TasksModule],
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)

        await app.init()
    })

    test('[GET] /tasks', async () => {
        const inMemoryTasksRepository = new InMemorytasksRepository()
        const tasksService = new TasksService(inMemoryTasksRepository)

        await tasksService.create({ title: 'titulo1', description: 'descricao' })
        await tasksService.create({ title: 'titulo2', description: 'descricao' })

        const response = await request(app.getHttpServer())
            .get('/tasks')
            .send()

        expect(response.statusCode).toBe(200)

    })

})