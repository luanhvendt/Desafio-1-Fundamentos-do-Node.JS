import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../app.module'
import { PrismaService } from '../../database/PrismaService'
import { TasksModule } from './tasks.module'

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
        const response = await request(app.getHttpServer())
            .get('/tasks')
            .send()

        expect(response.statusCode).toBe(200)

    })

    test('[GET] /tasks/:id', async () => {
        const createdTask = await request(app.getHttpServer())
            .post('/tasks')
            .send({ title: 'Nova Task', description: 'descricao' })
            .expect(201)


        const response = await request(app.getHttpServer())
            .get(`/tasks/${createdTask.body.id}`)
            .expect(200)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(expect.objectContaining({
            title: 'Nova Task',
        }))

    })

    test('[POST] /tasks', async () => {
        const response = await request(app.getHttpServer())
            .post('/tasks')
            .send({ title: 'test e2e Post', description: 'descricao' })
            .expect(201)

        expect(response.body).toEqual(expect.objectContaining({
            title: 'test e2e Post',
        }))
    })

    test('[PUT] /tasks/:id', async () => {
        const createResponse = await request(app.getHttpServer())
            .post('/tasks')
            .send({ title: 'taskToUpdate', description: 'descricao' })
            .expect(201)

        expect(createResponse.body).toEqual(expect.objectContaining({
            title: 'taskToUpdate',
        }))

        const taskId = createResponse.body.id

        const response = await request(app.getHttpServer())
            .put(`/tasks/${taskId}`)
            .send({ title: 'updatedTask', description: 'updatedDescricao' })
            .expect(200)

        expect(response.body).toEqual(expect.objectContaining({
            title: 'updatedTask',
        }))
    })

    test('[DELETE] /tasks', async () => {
        const createResponse = await request(app.getHttpServer())
            .post('/tasks')
            .send({ title: 'taskToUpdate', description: 'descricao' })
            .expect(201)

        expect(createResponse.body).toEqual(expect.objectContaining({
            title: 'taskToUpdate',
        }))

        const taskId = createResponse.body.id

        const deleteResponse = await request(app.getHttpServer())
            .delete(`/tasks/${taskId}`)
            .expect(204)
    })

})