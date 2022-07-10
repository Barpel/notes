import React, { FC } from 'react';
import { INote } from '../../type';
import styles from './index.module.scss';



interface ActionItemProps {
    actionName: string
    onTrigger: Function
    currentNote: INote | {}
    isDisabled: boolean 
}

const ActionItem: FC<ActionItemProps> = ({ actionName, onTrigger, currentNote, isDisabled }) => {

    const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onTrigger(currentNote);
    }

    return (
        <button onClick={handleActionClick} className={styles.button} disabled={isDisabled}>
            {actionName}
        </button>
    )
}

export { ActionItem };