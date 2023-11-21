// define task type
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate?: Date;
    createdAt?: Date;
}

export interface TasksFilter {
    status: string;
    title: string;
}

export interface TasksOrder {
    order: string;
    orderBy: string;
}