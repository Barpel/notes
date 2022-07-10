import React, { FC } from 'react';
import styles from './index.module.scss';

interface PopUpProps {
    shouldShowPopUp: boolean
    children: JSX.Element
}

const PopUp: FC<PopUpProps> = ({ shouldShowPopUp, children }) => {

    return (shouldShowPopUp ? <div className={styles.popUp}>
        {children}
    </div> : null);
}

export { PopUp };