import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { INote } from '../../store/notes/interfaces';
import { NotesAppHeader } from '../../components/NotesAppHeader';
import { NoteList } from '../../components/NoteList';
import { NoteEditor } from '../../components/NoteEditor';
import { debounce } from '../../helpers/debounce';
import { parseTimeFromSeconds, calculateTimeDifference } from '../../helpers/time';
import { useNotes } from '../../hooks/NotesHook';

const getLastSavedTemplate = (time: number) => {
    return `Last saved ${parseTimeFromSeconds(Math.floor(time))} ago`;
}

const Notes = () => {
    const { editNote, notes, } = useNotes();
    const [selectedNote, setSelectedNote] = useState(notes[0]);
    const [lastSaved, setLastSaved] = useState('');

    useEffect(() => {
        if (selectedNote) {
            const interval = window.setInterval(() => {
                const intervalTimeDiff = selectedNote && calculateTimeDifference(selectedNote.lastEdited);
                intervalTimeDiff && setLastSaved(getLastSavedTemplate(intervalTimeDiff));
            }, 3000);

            return () => window.clearInterval(interval);
        }
    }, [selectedNote])

    useEffect(() => {
        setLastSaved('');
        setSelectedNote(notes && notes[0]);
    }, [notes, notes.length])

    const MemoizedHeader = useMemo(() => NotesAppHeader, []);

    const handleNoteSelected = (noteId: number | string) => {
        const note = notes?.find((n: INote) => n.id === noteId);
        setLastSaved('');
        note && setSelectedNote(note);
    };

    const autoSave = debounce((note: INote) => {
        const now = new Date();
        editNote({ ...note, lastEdited: now });
    }, 2000);

    return (
        <div className={styles.container}>
            <MemoizedHeader
                currentNote={selectedNote}
                lastSaved={lastSaved}
            />
            {
                notes?.length ? (
                    <>
                        <div className={styles.notesContainer}>
                            <NoteList notes={notes} onNoteClick={handleNoteSelected} selectedNote={selectedNote} />
                            <NoteEditor note={selectedNote} onEditNote={autoSave} />
                        </div>
                    </>
                ) : <div className={styles.fallbackMessage}>Please create a new note</div>
            }
        </div >
    )
}

export { Notes };