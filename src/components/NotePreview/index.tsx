import React, { FC } from 'react';
import styles from './index.module.scss';

interface NotePreviewProps {
    id: number | string
    body: string
    onNoteClick: Function
    isSelected?: boolean
}


const NotePreview: FC<NotePreviewProps> = ({ id, body, onNoteClick, isSelected }) => {

    return (
        <p className={`${styles.preview} ${isSelected ? styles.selected : ''}`} onClick={() => onNoteClick(id)}>
            {body || 'No Text'}
        </p>
    )
}

export { NotePreview };