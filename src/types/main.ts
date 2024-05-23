export interface TResponse<T> {
    status: number;
    message: string;
    data: T;
};