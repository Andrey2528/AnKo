// ...existing code...
import React, { useEffect, useRef, useState } from 'react';
import './Marquee.scss';

const Marquee = ({
    children,
    className = '',
    direction = 'left', // 'left' | 'right' | 'up' | 'down'
    speed = 60, // px per second
    gap = 40, // px between repeats
    pauseOnHover = true,
    ...props
}) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [duration, setDuration] = useState(10);
    const [translatePx, setTranslatePx] = useState(0);

    useEffect(() => {
        const calc = () => {
            const container = containerRef.current;
            const track = trackRef.current;
            if (!container || !track) return;

            const isHorizontal = direction === 'left' || direction === 'right';
            const firstItem = track.children[0];
            if (!firstItem) return;

            // точна ширина/висота одного дубля
            const contentSize = isHorizontal
                ? firstItem.offsetWidth
                : firstItem.offsetHeight;

            // треба прокрутити на ширину контенту + gap, щоб повністю "зігнати" один дубль
            const movePx = contentSize + gap;
            const dur = speed > 0 ? movePx / speed : 10;

            setDuration(Math.max(dur, 1.5));
            setTranslatePx(-Math.round(movePx));
        };

        calc();
        const ro = new ResizeObserver(calc);
        if (containerRef.current) ro.observe(containerRef.current);
        if (trackRef.current) ro.observe(trackRef.current);
        window.addEventListener('load', calc);
        return () => {
            ro.disconnect();
            window.removeEventListener('load', calc);
        };
    }, [direction, speed, gap, children]);

    const baseClass = `marquee marquee--${direction} ${className}`.trim();
    const style = {
        ['--marquee-duration']: `${duration}s`,
        ['--marquee-gap']: `${gap}px`,
        ['--marquee-translate']: `${translatePx}px`,
    };

    return (
        <div
            className={baseClass}
            ref={containerRef}
            style={style}
            {...(pauseOnHover ? { 'data-pause-on-hover': 'true' } : {})}
            {...props}
        >
            <div className="marquee__track" ref={trackRef} aria-hidden="false">
                <div className="marquee__item">{children}</div>
                <div className="marquee__item" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
// ...existing code...
