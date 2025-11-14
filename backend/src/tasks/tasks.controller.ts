import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() task: Task) {
    return this.tasksService.create(task);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() task: Partial<Task>) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}