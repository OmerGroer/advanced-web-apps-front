import { useEffect, useRef } from "react";

const useScroll = <T extends HTMLElement>(callback: () => void) => {
    const elementRef = useRef<T>(null);

    const handleScroll = () => {
        const element = elementRef.current;
        if (element && element.scrollHeight - element.scrollTop === element.clientHeight) {
            callback()
        }
    };

    useEffect(() => {
        const element = elementRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return elementRef;
}

export default useScroll