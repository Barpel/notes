import { ReactChild } from "react"

export interface INote {
    id: number | string
    body: string
    lastEdited: Date
}

export type NoteState = {
    notes: INote[]
}

export type NoteAction =
    { type: 'ADD_NOTE'; } |
    { type: 'REMOVE_NOTE'; payload: INote } |
    { type: 'EDIT_NOTE'; payload: INote } |
    { type: 'SET_NOTES'; payload: INote[] } |
    { type: 'SET_SORTED_NOTES'; };


export type DispatchType = (args: NoteAction) => NoteAction

// interface Actions {
//     [key?: string]
//     new?: Function
//     delete?: Function
//     update?: Function
// }



