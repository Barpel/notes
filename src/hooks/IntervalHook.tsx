import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number) => {
    const savedCallbak = useRef(callback);

    useEffect(() => {
        savedCallbak.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallbak.current();
        }
        const interval = window.setInterval(tick, delay);
        return () => window.clearInterval(interval);
    }, [delay])
} 