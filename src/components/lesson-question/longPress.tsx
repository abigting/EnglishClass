import { useCallback, useRef, useState } from "react";

/**
 * 
 * @param onLongPress 长按事件
 * @param onClick 点击事件
 * @param stopLongPress 长按事件结束状态
 * @param param2 
 * @returns 
 */

const useLongPress = (
    onStart: () => any,
    onLongPress: (arg0: any) => void,
    onClick: () => any,
    stopLongPress: () => any,
    { shouldPreventDefault = true, delay = 3000 } = {}
) => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout: any = useRef();
    const target: any = useRef();

    const start = useCallback(
        ( event: { target: any }) => {
            onStart();
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener("touchend", preventDefault, {
                    passive: false
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, delay);
        },
        [onStart, onLongPress, delay, shouldPreventDefault]
    );

    const clear = useCallback(
        (_event: any, shouldTriggerClick = true) => {
            console.log(longPressTriggered, '123')
            timeout.current && clearTimeout(timeout.current);
            shouldTriggerClick && !longPressTriggered && onClick();
            if (longPressTriggered) {
                console.log('123')
                stopLongPress()
            }
            setLongPressTriggered(false);

            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener("touchend", preventDefault);
            }
        },
        [shouldPreventDefault, onClick, longPressTriggered, stopLongPress]
    );

    return {
        onMouseDown: (e: any) => start(e),
        onMouseLeave: (e: any) => clear(e)
    };
};

const isTouchEvent = (event: any) => {
    return "touches" in event;
};

const preventDefault = (event: { touches: string | any[]; preventDefault: () => void; }) => {
    if (!isTouchEvent(event)) return;

    if (event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
};

export default useLongPress;