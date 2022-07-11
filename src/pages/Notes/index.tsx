import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { INote } from '../../store/notes/interfaces';
import { NotesAppHeader } from '../../components/NotesAppHeader';
import { NoteList } from '../../components/NoteList';
import { NoteEditor } from '../../components/NoteEditor';
import { debounce } from '../../helpers/debounce';
import { parseTimeFromSeconds, calculateTimeDifference } from '../../helpers/time';
import { useNotes } from '../../hooks/NotesHook';
// import { useInterval } from '../../hooks/IntervalHook';
import { useNewInterval } from '../../hooks/NewIntervalHook';



const getLastSavedTemplate = (time: number) => {
    return `Last saved ${parseTimeFromSeconds(Math.floor(time))} ago`;
}

const Notes = () => {
    const { editNote, notes, } = useNotes();
    const [selectedNote, setSelectedNote] = useState(notes[0]);
    const [lastSaved, setLastSaved] = useState('');

    const { start, stop, counter } = useNewInterval();

    useEffect(() => {
        const intervalTimeDiff = selectedNote && calculateTimeDifference(selectedNote.lastEdited);
        intervalTimeDiff && setLastSaved(getLastSavedTemplate(intervalTimeDiff));
    }, [counter, selectedNote])

    useEffect(() => {
        setLastSaved('');
        setSelectedNote(notes && notes[0]);
    }, [notes, notes.length])

    // useInterval(() => {
    //     if (notes?.length) {
    //         calculateAndSetTimeDiff();
    //     }
    // }, notes?.length ? 5 * 1000 : null, notes); // This updates the last saved text for each note

    const MemoizedHeader = useMemo(() => NotesAppHeader, []);

    const handleNoteSelected = (noteId: number | string) => {
        const note = notes?.find((n: INote) => n.id === noteId);
        setLastSaved('');
        note && setSelectedNote(note);
        stop();
    };

    const autoSave = debounce((note: INote) => {
        stop();
        const now = new Date();
        editNote({ ...note, lastEdited: now });
        start();
    }, 2000);

    const calculateAndSetTimeDiff = () => {
        const intervalTimeDiff = selectedNote && calculateTimeDifference(selectedNote.lastEdited);
        intervalTimeDiff && setLastSaved(getLastSavedTemplate(intervalTimeDiff));
    };

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