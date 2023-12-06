import { Injectable } from '@nestjs/common';
import { TaskDto, TasksFilterDto, TasksOrderDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(taskDto: TaskDto) {
    return await this.prisma.task.create({
      data: taskDto,
    });
  }

  async updateTask(id: number, taskDto: TaskDto) {
    return await this.prisma.task.update({
      where: { id },
      data: taskDto,
    });
  }

  async getTasks(filterDto: TasksFilterDto, orderDto: TasksOrderDto) {
    const { status, title } = filterDto;
    const { order, orderBy } = orderDto;
    const tasks = await this.prisma.task.findMany({
      where: {
        status,
        title: {
          contains: title,
        },
      },
      orderBy: {
        [orderBy]: order,
      },
    });
    return tasks;
  }

  async getTaskById(id: number) {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async deleteTaskById(id: number) {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
