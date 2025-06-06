import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Assuming axios is used for API calls, add if not present

// Helper to get API URL from environment variables or a config file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

function PaymentOptionsContent({ orderAmount, orderDescription }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVnpayPayment = async () => {
        setLoading(true);
        setError(null);
        try {
            // Use props for order details
            const orderDetails = {
                amount: orderAmount, // Amount in VND, passed as prop
                orderDescription: orderDescription, // Order description, passed as prop
                language: 'vn',
                bankCode: '', // Optional: specify bank code e.g., VNBANK, INTCARD, VNPAYQR
                // orderType: 'fashion', // Optional: categorize the order, can be passed as prop if needed
            };

            const response = await axios.post(`${API_BASE_URL}/payment/create_payment_url`, orderDetails);

            if (response.data && response.data.code === '00' && response.data.data) {
                // Redirect to VNPAY URL
                window.location.href = response.data.data;
            } else {
                setError(response.data.message || 'Failed to create VNPAY payment URL.');
            }
        } catch (err) {
            console.error('VNPAY payment error:', err);
            setError(err.response?.data?.message || err.message || 'An error occurred during VNPAY payment initiation.');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Payment Options</h2>
            <p>Select your preferred payment method.</p>

            {/* Placeholder for other payment options like Stripe, COD etc. */}
            {/* <div style={{ marginBottom: '20px' }}>
                <h4>Credit/Debit Card (Stripe)</h4>
                <button>Pay with Stripe</button>
            </div> */}

            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                <h4>VNPAY</h4>
                <p>Pay securely with VNPAY. You will be redirected to the VNPAY gateway.</p>
                <p>
                    <strong>Order Amount:</strong> {orderAmount.toLocaleString('vi-VN')} VND
                </p>
                <button
                    onClick={handleVnpayPayment}
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                    }}
                >
                    {loading ? 'Processing...' : 'Pay with VNPAY'}
                </button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
            </div>

            {/* You might want a page/component to handle the /payment-result redirect from VNPAY */}
            {/* This component would parse query params and show success/failure to the user */}
        </div>
    );
}

PaymentOptionsContent.propTypes = {
    orderAmount: PropTypes.number.isRequired,
    orderDescription: PropTypes.string.isRequired,
};

export default PaymentOptionsContent;
