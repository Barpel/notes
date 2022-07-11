import React from 'react';
import styles from './index.module.scss';

interface HeaderButtonProps {
    value: string
    onTrigger: Function
    isDisabled: boolean
}

const HeaderButton = ({ value, onTrigger, isDisabled }: HeaderButtonProps) => {

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