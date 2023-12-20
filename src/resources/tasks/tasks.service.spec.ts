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
})