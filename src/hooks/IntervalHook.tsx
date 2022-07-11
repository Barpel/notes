import { useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useInterval(callback: () => void, delay: number | null, dep: any) {
    const savedCallback = useRef(callback)

    console.log(dep);
    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback
    }, [callback, dep])

    useEffect(() => {
        if (!delay && delay !== 0) {
            return
        }
        const id = setInterval(() => savedCallback.current(), delay);

        return () => {

            clearInterval(id)
        };
    }, [delay, dep])
}