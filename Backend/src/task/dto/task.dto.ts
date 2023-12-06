import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// define task type
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: TaskStatus;

  @IsString()
  @IsOptional()
  dueDate?: Date;
}

export interface TasksFilterDto {
  status: string;
  title: string;
}

export interface TasksOrderDto {
  order: string;
  orderBy: string;
}
