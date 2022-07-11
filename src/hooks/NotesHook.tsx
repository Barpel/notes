import React, { Dispatch, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { INote, NoteState } from "../store/notes/interfaces";
import {
    createNote,
    updateNote,
    deleteNote,
    fetchNotes
} from '../store/notes/middleware';
import { setSortedNotes } from "../store/notes/actionCreators";

export const useNotes = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const notes: INote[] = useSelector((state: NoteState) => state.notes, shallowEqual);

    useEffect(() => {
        dispatch(fetchNotes());
        dispatch(setSortedNotes());
    }, [dispatch])

    const addNewNote = React.useCallback(() => dispatch(createNote()), [dispatch]);
    const removeNote = React.useCallback((note: INote) => dispatch(deleteNote(note)), [dispatch]);
    const editNote = React.useCallback((note: INote) => dispatch(updateNote(note)), [dispatch]);

    return {
        addNewNote,
        removeNote,
        editNote,
        notes,
    }
}