import { Cliente } from "../interfaces/cliente/cliente";
// import { Action } from '@ngrx/store';
import * as PostActions from "./post.actions";

export type Action = PostActions.Actions;

// export interface State {
//     listClientes: Cliente[];
//     selectedCliente: string | null;
// };

// export const initialState: State = {
//     listClientes: [],
//     selectedCliente: null,
//   };
  

export function clienteReducer(state: Cliente[] = [], action) { // action: Action
    switch (action.type) {
        case 'ADD_ALL_CLIENT':
            return action.payload;
        case 'ADD_CLIENT':
        // case PostActions.ADD_CLIENT:
            return [...state, action.payload]
            break;
        case 'DELETE_CLIENT':
            // case PostActions.DELETE_CLIENT:
            const cliente = action.payload;
            if (state.length > 0) {
                const index = state.findIndex(cl => cl.key == cliente.key);
                state.splice(index,1);
            }            
            return state;
        default:
            break;
    }
}