import * as actionTypes from "./actionTypes"
import MOCK_DATA from '../mock_data.json';
import { NoteState, GenericAction, INote } from "../type";
import { sortByTimestamp } from "../helpers/sort";

const initialState: NoteState = {
    notes: [
        ...MOCK_DATA.notes.map(note => ({ ...note, lastEdited: new Date() })), // To make sure the first mock notes have a lastEdited property. Imagin this comes back from the API 
    ],
}

const reducer = (
    state: NoteState = initialState,
    action: GenericAction
): NoteState => {
    switch (action.type) {
        case actionTypes.ADD_NOTE:
            const newNote: INote = {
                id: Math.random() + '', // not really unique
                body: '',
                lastEdited: new Date(),
            }
            return {
                ...state,
                notes: [newNote].concat(state.notes)
            }
        case actionTypes.EDIT_NOTE:
            const notesCopy = state.notes.slice();
            const noteIndex = state.notes.findIndex(note => note.id === action?.note?.id);
            const note = state.notes[noteIndex];
            const editedNote: INote = {
                id: note?.id,
                body: action?.note?.body,
                lastEdited: action?.note?.lastEdited,
            }
            notesCopy[noteIndex] = editedNote;
            return {
                ...state,
                notes: notesCopy,
            }
        case actionTypes.REMOVE_NOTE:
            if (!action.note) {
                return {
                    ...state,
                }
            }
            const updatedNotes: INote[] = state.notes.filter(
                note => note.id !== action?.note?.id
            )
            return {
                ...state,
                notes: updatedNotes,
            }
        case actionTypes.GET_NOTES:
            return {
                ...state,
            }
        case actionTypes.GET_SORTED_NOTES:
            const sortedNotes = state.notes.slice().sort((a, b) => sortByTimestamp(a, b, 'lastEdited'));
            return {
                ...state,
                notes: sortedNotes,
            }
    }
    return state
}

export default reducer