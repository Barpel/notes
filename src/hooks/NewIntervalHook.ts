import { useState } from 'react';

export function useNewInterval() {
    const [counter, setCounter] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    return {
        start: () => {
            if (!isRunning) {
                setIsRunning(true)
                setIntervalId(window.setInterval(() => {
                    setCounter(s => s + 1);
                    // console.log('inside interval', counter);
                }, 1000))
            }
        }, stop: () => {
            setIsRunning(false);
            window.clearInterval(intervalId);
            console.log('killing', counter);
            setCounter(0);
        },
        counter
    }
};