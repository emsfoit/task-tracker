// define task type
export interface Task {
    id: number;
    title: string;
    description: string;
    done?: boolean;
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