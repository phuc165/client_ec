import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/components/countdownTimer.module.scss';
import clsx from 'clsx';
import axios from 'axios'; // Import axios

function CountdownTimer({ timerName }) {
    const [timeRemaining, setTimeRemaining] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });
    const [endTime, setEndTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchTimerState = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/timer/${timerName}`); // Use axios.get
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = response.data; // Store response.data to a variable for clarity

                if (responseData.success && responseData.data && responseData.data.length > 0 && responseData.data[0].endTime) {
                    const fetchedEndTime = responseData.data[0].endTime; // Access endTime from the nested path
                    sessionStorage.setItem('countdownEndTime', fetchedEndTime);
                    setEndTime(fetchedEndTime);
                } else {
                    setError(new Error("Backend response missing 'endTime' or incorrect data structure"));
                }
            } catch (e) {
                setError(e);
                console.error('Failed to fetch timer end time:', e);
            } finally {
                setIsLoading(false);
            }
        };

        // Check sessionStorage first
        const storedEndTime = sessionStorage.getItem('countdownEndTime');
        if (storedEndTime) {
            setEndTime(storedEndTime);
        } else {
            fetchTimerState();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []); // Empty dependency array: run only once on mount

    useEffect(() => {
        if (endTime) {
            intervalRef.current = setInterval(() => {
                const calculatedTime = calculateTimeRemaining(endTime); // Use the calculateTimeRemaining function
                setTimeRemaining(calculatedTime);
                if (isTimerFinished(calculatedTime)) {
                    clearInterval(intervalRef.current);
                    console.log('Countdown finished!');
                    // Optionally handle timer completion
                }
            }, 1000);
        }
    }, [endTime]);

    function calculateTimeRemaining(targetEndTime) {
        if (!targetEndTime) {
            return { days: '00', hours: '00', minutes: '00', seconds: '00' };
        }
        const now = new Date();
        const end = new Date(targetEndTime);
        const difference = end.getTime() - now.getTime();

        if (difference <= 0) {
            return { days: '00', hours: '00', minutes: '00', seconds: '00' }; // Timer finished
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
    }

    function isTimerFinished(currentTimeRemaining) {
        return (
            currentTimeRemaining.days === '00' &&
            currentTimeRemaining.hours === '00' &&
            currentTimeRemaining.minutes === '00' &&
            currentTimeRemaining.seconds === '00'
        );
    }

    if (isLoading) {
        return <div>Loading timer...</div>;
    }

    if (error) {
        return <div>Error loading timer: {error.message}</div>;
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.title)}>
                <div className={clsx(styles.subTitle)}>Days</div>
                <div className={clsx(styles.subTitle)}>Hours</div>
                <div className={clsx(styles.subTitle)}>Minutes</div>
                <div className={clsx(styles.subTitle)}>Seconds</div>
            </div>
            <div className={clsx(styles.title)}>
                <div className={clsx(styles.subContent)}>
                    {timeRemaining.days} <span>:</span>
                </div>
                <div className={clsx(styles.subContent)}>
                    {timeRemaining.hours} <span>:</span>
                </div>
                <div className={clsx(styles.subContent)}>
                    {timeRemaining.minutes} <span>:</span>
                </div>
                <div className={clsx(styles.subContent)}>{timeRemaining.seconds}</div>
            </div>
        </div>
    );
}

export default CountdownTimer;
