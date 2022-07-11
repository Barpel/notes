import {
    ADD_NOTE,
    REMOVE_NOTE,
    EDIT_NOTE,
    SET_NOTES,
    SET_SORTED_NOTES
} from "./actionTypes"
import MOCK_DATA from '../../mock_data.json';
import { NoteState, NoteAction, INote } from "./interfaces";

const initialState: NoteState = {
    notes: [
        ...MOCK_DATA.notes.map(note => ({ ...note, lastEdited: new Date() })), // To make sure the first mock notes have a lastEdited property. Imagin this comes back from the API 
    ],
}

const reducer = (
    state: NoteState = initialState,
    action: NoteAction
): NoteState => {
    switch (action.type) {
        case ADD_NOTE:
            const newNote: INote = {
                id: `${Math.random()}`, //note really unique
                body: '',
                lastEdited: new Date(),
            }
            return {
                ...state,
                notes: [newNote, ...state.notes],
            };
        case EDIT_NOTE:
            return {
                ...state,
                notes: [action.payload, ...state.notes.filter(n => n.id !== action.payload.id)],
            }
        case REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload.id),
            }
        case SET_NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        case SET_SORTED_NOTES:
            return {
                ...state,
                notes: [...state.notes].sort((a: INote, b: INote) => b.lastEdited.getTime() - a.lastEdited.getTime()),
            }
    }
    return state
}

export default reducer