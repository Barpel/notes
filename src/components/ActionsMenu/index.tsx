import React, { FC } from 'react';
import styles from './index.module.scss';
import { ActionItem } from '../ActionItem';
import { Actions, INote } from '../../type';


interface ActionsMenuProps {
    currentNote: INote | {}
    actions: Actions
    lastSaved: string
    disabledMapping: { [key: string]: number | boolean }
}


const ActionsMenu: FC<ActionsMenuProps> = ({ actions, currentNote, lastSaved, disabledMapping }) => {

    return (
        <div className={styles.actionsMenu}>
            <span className={styles.title}>Notes</span>
            <span className={styles.lastSaved}>{lastSaved}</span>
            <div className={styles.actionItemContainer}>
                {Object.keys(actions).map((key) => <ActionItem key={key} actionName={key} onTrigger={actions[key]} currentNote={currentNote || {}} isDisabled={Boolean(disabledMapping[key])} />)}
            </div>
        </div>
    )
}

export { ActionsMenu };