// store

import { ReactChild } from "react"

interface INote {
    id: number | string
    body: string
    lastEdited: Date
}

type NoteState = {
    notes: INote[]
}

type GenericAction = {
    type: string
    [x: string]: any
}

type DispatchType = (args: GenericAction) => GenericAction

interface Actions {
    [key?: string]
    new?: Function
    delete?: Function
    update?: Function
}


