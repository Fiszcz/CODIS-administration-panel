export interface ExecutiveNode {
    id: string;
    startupDate: string;
}

export interface Task {
    id: number;
    node: string;
    createdTime: Date | null;
    takeTime: Date | null;
    endTime: Date | null;

    task?: any;
    solution?: any;
}

export interface System {
    tasks: number;
    waitingTasks: number;
    runningTasks: number;
    nodes: number;
}

export interface ControlNotification {
    time: Date;
    message: string;
    type: 'primary' | 'warning' | 'error' | 'success' | 'custom' | 'info' | '';
}
