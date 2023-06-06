import { State } from "./state"

export interface Todo {
    id: number,
    categoryId: number,
    title: string,
    body: string,
    state: State
}

export interface AddTodo {
    categoryId: number;
    title: string;
    body: string;
}

export interface EditedTodo {
    categoryId: number;
    title: string;
    body: string;
    state: number;
}