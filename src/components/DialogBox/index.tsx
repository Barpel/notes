import React from 'react';
import styles from './index.module.scss';

interface DialogBoxProps {
    shouldShowPopUp: boolean
    handleYes: Function
    handleNo: Function
}

const DialogBox = ({ shouldShowPopUp, handleYes, handleNo }: DialogBoxProps) => {

    return (shouldShowPopUp ? <div className={styles.popUp}>
        <div>
            <div className={styles.backdrop}></div>
            <div className={styles.question}>
                <span>The current note will be deleted. Are you
                    sure?</span>
                <button onClick={() => handleYes()}>
                    Yes
                </button>
                <button onClick={() => handleNo()}>
                    No
                </button>
            </div>
        </div>
    </div> : null);
}

export { DialogBox };