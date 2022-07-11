import React, { useState } from 'react';
import styles from './index.module.scss';
import { HeaderButton } from '../HeaderButton';
import { INote } from '../../store/notes/interfaces';
import { useNotes } from '../../hooks/NotesHook';
import { DialogBox } from '../DialogBox';


interface NotesAppHeaderProps {
    currentNote: INote
    lastSaved: string
}


const NotesAppHeader = ({ currentNote, lastSaved }: NotesAppHeaderProps) => {
    const { addNewNote, removeNote, notes } = useNotes();
    const [showPopUp, setShowPopUp] = useState(false);


    return (
        <>
            <header className={styles.notesAppHeader}>
                <span className={styles.title}>Notes</span>
                <span className={styles.lastSaved}>{lastSaved}</span>
                <div className={styles.buttonContainer}>
                    <HeaderButton value='add' onTrigger={() => addNewNote()} isDisabled={false} />
                    <HeaderButton value='delete' onTrigger={() => setShowPopUp(true)} isDisabled={!notes.length} />
                </div>
            </header>
            {showPopUp && <DialogBox
                shouldShowPopUp={showPopUp}
                handleNo={() => setShowPopUp(false)}
                handleYes={() => {
                    if (currentNote) {
                        setShowPopUp(false);
                        removeNote(currentNote);
                    }
                }} />}
        </>
    )
}

export { NotesAppHeader };