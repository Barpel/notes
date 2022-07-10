import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addNote, removeNote, editNote, getSortedNotes } from './store/actionCreators';
import { Dispatch } from 'redux'
import { INote, NoteState } from './type';
import './App.scss';
import { Home } from './pages/Home';

const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const notes: INote[] = useSelector((state: NoteState) => state.notes, shallowEqual);

  useEffect(() => {
    dispatch(getSortedNotes()); // If you don't want sorted you can call 'getNotes' instead
  }, [notes])

  const addNewNote = React.useCallback((note: INote) => dispatch(addNote(note)), [dispatch]);
  const deleteNote = React.useCallback((note: INote) => dispatch(removeNote(note)), [dispatch]);
  const updateNote = React.useCallback((note: INote) => dispatch(editNote(note)), [dispatch]);

  return (
    <div className="App">
      <Home notes={notes} onEditNote={updateNote} onDeleteNote={deleteNote} onNewNote={addNewNote} />
    </div>
  );
}

export default App;
