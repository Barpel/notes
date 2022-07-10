import React, { FC, useRef, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { INote } from '../../type';


interface NoteEditorProps {
    note: INote | any
    onEditNote: Function
}

const NoteEditor: FC<NoteEditorProps> = ({ note, onEditNote }) => {
    const [currentNote, setCurrentNote] = useState(note);

    const InputRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

    useEffect(() => {
        setCurrentNote(note);
        InputRef?.current?.focus();
    }, [note]);

    const moveCaretAtEnd = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        var temp_value = e.target.value;
        e.target.value = '';
        e.target.value = temp_value;
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const updatedNote = { ...currentNote, body: value };
        updatedNote && setCurrentNote(updatedNote);
        onEditNote(updatedNote);
    };

    return (
        <div className={styles.wrapper}>
            <textarea
                value={currentNote?.body}
                onChange={handleTextChange}
                onFocus={moveCaretAtEnd}
                ref={InputRef}
                className={styles.textArea}
                placeholder='Enter text'
            />
        </div>
    )
}

export { NoteEditor };