import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { INote } from '../../type';
import { ActionsMenu } from '../../components/ActionsMenu';
import { NoteList } from '../../components/NoteList';
import { NoteEditor } from '../../components/NoteEditor';
import { PopUp } from '../../components/Popup';
import { debounce } from '../../helpers/debounce';
import { parseTimeFromSeconds, calculateTimeDifference } from '../../helpers/time';


interface HomeProps {
    notes?: INote[]
    onDeleteNote: Function
    onNewNote: Function
    onEditNote: Function
}

const getLastSavedTemplate = (time: number) => {
    return `Last saved ${parseTimeFromSeconds(Math.floor(time))} ago`;
}

const Home: FC<HomeProps> = ({ notes = [], onEditNote, onDeleteNote, onNewNote }) => {
    const [selectedNote, setSelectedNote] = useState(notes[0]);
    const [lastSaved, setLastSaved] = useState('');
    const [lastSavedInterval, setLastSavedInterval] = useState(0);
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        setSelectedNote(notes && notes[0]);
    }, [notes[0]])

    const handleNoteSelected = (noteId: number | string) => {
        const note = notes?.find((n: INote) => n.id === noteId);
        setLastSaved('');
        note && setSelectedNote(note);
        window.clearInterval(lastSavedInterval);
    };

    const autoSave = debounce((note: INote) => {
        const now = new Date();
        onEditNote({ ...note, lastEdited: now });
        // start interval to update last saved
        let interval = window.setInterval(() => calculateAndSetTimeDiff(now), 3 * 1000);

        setLastSavedInterval(interval);
    }, 2000);

    const calculateAndSetTimeDiff = (time: Date) => {
        const intervalTimeDiff = selectedNote && calculateTimeDifference(time);
        intervalTimeDiff && setLastSaved(getLastSavedTemplate(intervalTimeDiff));
    };

    const actions = {
        new: () => {
            window.clearInterval(lastSavedInterval);
            setLastSaved('');
            onNewNote();
        },
        delete: () => {
            setShowPopUp(true);
        },
    }


    return (
        <div className={styles.home}>
            {showPopUp && < PopUp shouldShowPopUp={showPopUp}>
                <div>
                    <div className={styles.popupBackdrop}></div>
                    <div className={styles.popupQuestion}>
                        <span>The current note will be deleted. Are you
                            sure?</span>
                        <button onClick={() => {
                            if (selectedNote && onDeleteNote) {
                                setShowPopUp(false);
                                onDeleteNote(selectedNote);
                            }
                        }}>
                            Yes
                        </button>
                        <button onClick={() => setShowPopUp(false)}>
                            No
                        </button>
                    </div>
                </div>
            </PopUp>}
            <ActionsMenu
                actions={actions}
                currentNote={selectedNote || {}}
                lastSaved={lastSaved}
                disabledMapping={{ delete: !notes?.length }}
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

export { Home };