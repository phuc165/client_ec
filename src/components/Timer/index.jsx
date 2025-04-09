import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimers } from '../../redux/slices/timerSlice';
import clsx from 'clsx';
import styles from '../../styles/core/timer.module.scss';

function Timer({ timerName, styleType }) {
    const dispatch = useDispatch();
    const { timers, loading, error } = useSelector((state) => state.timers);

    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        dispatch(fetchTimers({ type: timerName }));
    }, [dispatch, timerName]);

    useEffect(() => {
        const timerData = timers[timerName]?.[0]; // Get the first timer object
        const endTime = timerData?.endTime;

        const calculateTimeLeft = () => {
            if (!endTime) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

            const now = new Date().getTime();
            const end = new Date(endTime).getTime();
            const difference = end - now;

            if (difference <= 0) {
                return { days: '00', hours: '00', minutes: '00', seconds: '00' };
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            return {
                days: String(days).padStart(2, '0'),
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0'),
            };
        };

        setTimeLeft(calculateTimeLeft());
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [timers, timerName]); // Depend on timers to update when Redux state changes
    if (loading[timerName]) return <div>Loading...</div>;
    if (error[timerName]) return <div>Error: {error[timerName]}</div>;

    const timeUnits = [
        { key: 'days', label: 'Days', value: timeLeft.days },
        { key: 'hours', label: 'Hours', value: timeLeft.hours },
        { key: 'minutes', label: 'Minutes', value: timeLeft.minutes },
        { key: 'seconds', label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <>
            {styleType === 'flash-sale' ? (
                <div className={clsx(styles.timer, styles[styleType])}>
                    {timeUnits.map((unit) => (
                        <React.Fragment key={unit.key}>
                            <div className={styles.timerUnit}>
                                <div className={styles.subContainer}>
                                    <span className={styles.timerLabel}>{unit.label}</span>
                                    <span className={styles.timerValue}>{unit.value}</span>
                                </div>
                            </div>
                            <span className={styles.dauHaiCham}>:</span>
                        </React.Fragment>
                    ))}
                </div>
            ) : 'sale-off' ? (
                <div className={clsx(styles.timer, styles[styleType])}>
                    {timeUnits.map((unit) => (
                        <div key={unit.key} className={styles.timerUnit}>
                            <span className={styles.timerValue}>{unit.value}</span>
                            <span className={styles.timerLabel}>{unit.label}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}

export default Timer;
