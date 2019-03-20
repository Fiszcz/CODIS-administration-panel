export interface ExecutiveNode {
    id: string;
    startupDate: string;
}

export interface Task {
    id: string;
    node: string;
    takeTime: number;
    endTime: number;

    task?: any;
    solution?: any;
}

export interface System {
    tasks: number;
    waitingTasks: number;
    runningTasks: number;
    nodes: number;
    startupDate: number;
}
