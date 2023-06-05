export interface ITask {
    title: string;
    description: string;
    owner?: string;
    tag?: String[];
    created_at?: Date;
    updated_at?: Date;
}