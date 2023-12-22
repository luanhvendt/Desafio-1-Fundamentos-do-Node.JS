import { Module } from '@nestjs/common';
import { TasksModule } from './resources/tasks/tasks.module';

@Module({
  imports: [TasksModule],
  providers: [],

})
export class AppModule { }
