import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { TaskDto, TasksFilterDto, TasksOrderDto } from './dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  createTask(@Body() taskdto: TaskDto) {
    return this.taskService.createTask(taskdto);
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() taskDto: TaskDto) {
    return this.taskService.updateTask(id, taskDto);
  }

  @Get()
  getTasks(
    @Query() filterDto: TasksFilterDto,
    @Query() orderDto: TasksOrderDto,
  ) {
    return this.taskService.getTasks(filterDto, orderDto);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTaskById(id);
  }
}
