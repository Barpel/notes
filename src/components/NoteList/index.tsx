import React, { FC } from 'react';
import styles from './index.module.scss';
import { NotePreview } from '../NotePreview';
import { INote } from '../../type';


interface NoteListProps {
    notes: INote[]
    onNoteClick: Function
    selectedNote: INote
}

const NoteList: FC<NoteListProps> = ({ notes, onNoteClick, selectedNote }) => {
    
    return (
        <div className={styles.listWrapper}>
            {notes?.map(note => <NotePreview
                id={note.id}
                key={note.id}
                body={note.body?.split('\n')[0]}
                onNoteClick={onNoteClick}
                isSelected={selectedNote?.id === note.id}
            />)}
        </div>
    )
}

export { NoteList };