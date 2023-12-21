import { InMemorytasksRepository } from "../../../test/repositories/InMemoryTasksRepository"
import { TasksService } from "./tasks.service"


describe('CreateTas service', () => {
    it('should be able to create a new task', async () => {
        const inMemoryTasksRepository = new InMemorytasksRepository()
        const tasksService = new TasksService(inMemoryTasksRepository)

        await expect(tasksService.create({ title: 'Nova task', description: 'descricao' }))
            .resolves
            .not
            .toThrow()

        expect(inMemoryTasksRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: 'Nova task'
            })
        ]))
    })

    it('should not be able to create a new task with invalid title', async () => {
        const inMemoryTasksRepository = new InMemorytasksRepository()
        const tasksService = new TasksService(inMemoryTasksRepository)

        await expect(tasksService.create({ title: '', description: 'descricao' }))
            .rejects
            .toThrow()

        expect(inMemoryTasksRepository.items).toEqual([])
    })

    it('should be able to find all tasks', async () => {
        const inMemoryTasksRepository = new InMemorytasksRepository()
        const tasksService = new TasksService(inMemoryTasksRepository)

        await expect(tasksService.create({ title: 'Nova task1', description: 'descricao' }))
            .resolves
            .not
            .toThrow()

        await expect(tasksService.create({ title: 'Nova task2', description: 'descricao' }))
            .resolves
            .not
            .toThrow()

        const allTasks = await tasksService.findAll()

        expect(allTasks).toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: 'Nova task1'
            }),
            expect.objectContaining({
                title: 'Nova task2'
            })
        ]))
    })

    it('should be able to find an unique task', async () => {
        const inMemoryTasksRepository = new InMemorytasksRepository()
        const tasksService = new TasksService(inMemoryTasksRepository)

        await expect(tasksService.create({ title: 'Nova task1', description: 'descricao' }))
            .resolves
            .not
            .toThrow()

        const task = await tasksService.findUnique('1')

        expect(task).toEqual(
            expect.objectContaining({
                title: 'Nova task1'
            }),
        )
    })

    it('should be able to update a task', async () => {
        const inMemoryTasksRepository = new InMemorytasksRepository()
        const tasksService = new TasksService(inMemoryTasksRepository)

        await expect(tasksService.create({ title: 'Nova task', description: 'descricao' }))
            .resolves
            .not
            .toThrow()

        await expect(tasksService.update('1', { title: 'Task Alterada', description: 'alterada' }))

        expect(inMemoryTasksRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: 'Task Alterada'
            })
        ]))
    })

    it('should not be able to update a task with unknown id', async () => {
        const inMemoryTasksRepository = new InMemorytasksRepository()
        const tasksService = new TasksService(inMemoryTasksRepository)

        await expect(tasksService.create({ title: 'Nova task', description: 'descricao' }))
            .resolves
            .not
            .toThrow()

        await expect(tasksService.update('aaa', { title: 'Task Alterada', description: 'alterada' }))
            .rejects

        expect(inMemoryTasksRepository.items).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: 'Task Alterada'
            })
        ]))
    })

    it('should be able to delete a task', async () => {
        const inMemoryTasksRepository = new InMemorytasksRepository()
        const tasksService = new TasksService(inMemoryTasksRepository)

        await expect(tasksService.create({ title: 'Nova task', description: 'descricao' }))
            .resolves
            .not
            .toThrow()

        await expect(tasksService.delete('1'))
            .resolves
            .not
            .toThrow()

        expect(inMemoryTasksRepository.items).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: 'Nova task'
            })
        ]))
    })
})