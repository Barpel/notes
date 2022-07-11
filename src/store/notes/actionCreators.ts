import { INote, NoteAction } from "./interfaces"
import {
    ADD_NOTE,
    REMOVE_NOTE,
    EDIT_NOTE,
    SET_NOTES,
    SET_SORTED_NOTES
} from "./actionTypes"

export function addNote() {
    const action: NoteAction = {
        type: ADD_NOTE,
    };
    return action;
}

export function removeNote(note: INote) {
    const action: NoteAction = {
        type: REMOVE_NOTE,
        payload: note,
    };
    return action;
}

export function editNote(note: INote) {
    const action: NoteAction = {
        type: EDIT_NOTE,
        payload: note,
    };
    return action;
}

export function setNotes(notes: INote[]) {
    const action: NoteAction = {
        type: SET_NOTES,
        payload: notes,
    };
    return action;
}

export function setSortedNotes() {
    const action: NoteAction = {
        type: SET_SORTED_NOTES,
    };
    return action;
}