import React, { FC } from 'react';
import { INote } from '../../store/notes/interfaces';
import styles from './index.module.scss';

interface HeaderButtonProps {
    value: string
    onTrigger: Function
    isDisabled: boolean
}

const HeaderButton: FC<HeaderButtonProps> = ({ value, onTrigger, isDisabled }) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onTrigger();
    }

    return (
        <button onClick={handleClick} className={styles.button} disabled={isDisabled}>
            {value}
        </button>
    )
}

export { HeaderButton };