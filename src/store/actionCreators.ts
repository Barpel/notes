import { DispatchType, INote, GenericAction } from "../type"
import * as actionTypes from "./actionTypes"

export function addNote(note: INote) {
    const action: GenericAction = {
        type: actionTypes.ADD_NOTE,
        note,
    };
    return simulateHttpRequest(action);
}

export function removeNote(note: INote) {
    const action: GenericAction = {
        type: actionTypes.REMOVE_NOTE,
        note,
    };
    return simulateHttpRequest(action);
}

export function editNote(note: INote) {
    const action: GenericAction = {
        type: actionTypes.EDIT_NOTE,
        note,
    };
    return simulateHttpRequest(action);
}

export function getNotes() {
    const action: GenericAction = {
        type: actionTypes.GET_NOTES
    };
    return simulateHttpRequest(action);
}

export function getSortedNotes() {
    const action: GenericAction = {
        type: actionTypes.GET_SORTED_NOTES
    };
    return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: GenericAction): any {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    };
};