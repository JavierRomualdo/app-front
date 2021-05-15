
import { Action } from '@ngrx/store';
import { Cliente } from '../interfaces/cliente/cliente';

export const ADD_CLIENT = '[Post] ADD';
export const UPDATE_CLIENT = '[Post] ADD';
export const DELETE_CLIENT = '[Post] DELETE';

export class AddClient implements Action {
    readonly type = ADD_CLIENT;

    constructor(public payload: Cliente) {}
}

export class EditClient implements Action {
    readonly type = UPDATE_CLIENT;

    constructor(public payload: Cliente) {}
}

export class DeleteClient implements Action {
    readonly type = DELETE_CLIENT;

    constructor(public payload: Cliente) {}
}

export type Actions = AddClient | EditClient | DeleteClient;