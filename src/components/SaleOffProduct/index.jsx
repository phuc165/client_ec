import styles from '../../styles/components/saleOffProduct.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SaleOffProduct() {
    // State for the countdown timer
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 23,
        minutes: 59,
        seconds: 35,
    });

    // State for loading and error handling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for timer data
    const [timerData, setTimerData] = useState(null);

    // Fetch timer data and set up countdown
    useEffect(() => {
        const fetchTimerData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/timer/sale%20off%20product%20timer');

                if (Array.isArray(response.data)) {
                    setTimerData(response.data[0]);
                }
                // Handle nested data structure
                else if (response.data.success && response.data.data) {
                    // If data is an array, take the first item
                    if (Array.isArray(response.data.data)) {
                        setTimerData(response.data.data[0]);
                    } else {
                        setTimerData(response.data.data);
                    }
                }
                // Direct object response
                else {
                    setTimerData(response.data);
                }
            } catch (error) {
                console.error('Error fetching timer data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTimerData();
    }, ['http://localhost:3000/api/v1/timer/sale%20off%20product%20timer']);

    // Set up countdown based on timer data
    useEffect(() => {
        if (!timerData) return;

        let timer;

        const calculateTimeLeft = () => {
            const now = new Date().getTime();

            // If endTime is null, we'll use a fixed duration from now (like 7 days)
            // Otherwise, use the actual endTime from the API
            const endDateTime = timerData.endTime ? new Date(timerData.endTime).getTime() : now + 7 * 24 * 60 * 60 * 1000; // 7 days as default

            const difference = endDateTime - now;

            if (difference <= 0) {
                // Time has expired
                clearInterval(timer);
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                };
            }

            // Calculate time units
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            return {
                days,
                hours,
                minutes,
                seconds,
            };
        };

        // Set initial time
        setTimeLeft(calculateTimeLeft());

        // Update every second
        timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timerData]);

    if (loading) {
        return (
            <div className={styles.bannerContainer}>
                <div className={styles.loadingIndicator}>Loading promotion details...</div>
            </div>
        );
    }

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.contentSide}>
                <div className={styles.categoryLabel}>Categories</div>
                <h1 className={styles.bannerTitle}>
                    Enhance Your
                    <br />
                    Music Experience
                </h1>

                <div className={styles.countdownContainer}>
                    {Object.entries(timeLeft).map(([key, value]) => (
                        <div key={key} className={styles.countdownItem}>
                            <div className={styles.countdownValue}>{String(value).padStart(2, '0')}</div>
                            <div className={styles.countdownLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                        </div>
                    ))}
                </div>

                <button className={styles.buyButton}>Buy Now!</button>
            </div>

            <div className={styles.productSide}>
                <div className={styles.blurBackground}></div>
                <div className={styles.productImage}>
                    <img src='/path-to-jbl-speaker.png' alt='JBL Speaker' />
                </div>
            </div>
        </div>
    );
}

export default SaleOffProduct;
