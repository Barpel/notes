import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { INote } from "./interfaces";
import MOCK_DATA from '../../mock_data.json';
import { addNote, editNote, setNotes, removeNote } from "./actionCreators";

export function createNote(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return (dispatch) => new Promise((resolve) => {
        dispatch(addNote());
        resolve();
    });
}

export function updateNote(note: INote): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return (dispatch) => new Promise((resolve) => {
        dispatch(editNote(note));
        resolve();
    });
}

export function deleteNote(note: INote): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return (dispatch) => new Promise((resolve) => {
        dispatch(removeNote(note));
        resolve();
    });
}

export function fetchNotes(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return (dispatch) => new Promise((resolve) => {
        dispatch(setNotes(MOCK_DATA.notes.map(note => ({ ...note, lastEdited: new Date() }))));
        resolve();
    });
}

