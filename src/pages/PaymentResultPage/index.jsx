import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Assuming React Router is used
import axios from 'axios';

// Helper to parse query string
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Optional: API call to verify transaction status with your backend if needed
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
// const verifyPaymentOnServer = async (params) => {
//     try {
//         // Example: you might want to send all vnp_Params to your server to double check
//         // const response = await axios.post(`${API_BASE_URL}/payment/verify_vnpay_return`, params);
//         // return response.data;
//         return { valid: true, message: 'Verification successful (mocked)' }; // Mocked response
//     } catch (error) {
//         console.error('Error verifying payment on server:', error);
//         return { valid: false, message: 'Server verification failed' };
//     }
// };

function PaymentResultPage() {
    const query = useQuery();
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState('processing'); // processing, success, failed
    const [message, setMessage] = useState('Processing your payment...');
    const [vnpParams, setVnpParams] = useState({});

    useEffect(() => {
        const params = {};
        for (let [key, value] of query.entries()) {
            params[key] = value;
        }
        setVnpParams(params);

        // Basic check based on vnp_ResponseCode from VNPAY
        // More robust verification should happen on your server via IPN
        // and potentially an additional server-side check here if desired.
        const responseCode = params['vnp_ResponseCode'];

        if (responseCode === '00') {
            setPaymentStatus('success');
            setMessage('Payment successful! Thank you for your purchase.');
            // TODO: Clear cart, update order status in client state/context if needed
        } else if (responseCode === '97') {
            // This was our custom code for checksum failure on server
            setPaymentStatus('failed');
            setMessage('Payment failed: Invalid signature. Please contact support.');
        } else {
            setPaymentStatus('failed');
            // You can map more VNPAY response codes to user-friendly messages
            // See VNPAY documentation for a full list of response codes
            let failureReason = 'Payment was not successful.';
            if (params['vnp_TransactionStatus'] === '02') failureReason = 'Transaction failed at VNPAY.';
            // Add more specific messages based on responseCode or vnp_TransactionStatus
            setMessage(`${failureReason} (Code: ${responseCode})`);
        }

        // Optional: Call server to verify (if you implement such an endpoint)
        // const verify = async () => {
        //     const verificationResult = await verifyPaymentOnServer(params);
        //     if (verificationResult.valid && responseCode === '00') {
        //         setPaymentStatus('success');
        //         setMessage(verificationResult.message || 'Payment confirmed successfully!');
        //     } else {
        //         setPaymentStatus('failed');
        //         setMessage(verificationResult.message || 'Payment confirmation failed.');
        //     }
        // };
        // verify();
    }, [location.search]); // Rerun when query params change

    return (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1>Payment Status</h1>
            {paymentStatus === 'processing' && (
                <p>{message}</p>
                // Add a spinner or loading animation here
            )}
            {paymentStatus === 'success' && (
                <div style={{ color: 'green' }}>
                    <h2>Success!</h2>
                    <p>{message}</p>
                    <p>Order ID (vnp_TxnRef): {vnpParams['vnp_TxnRef']}</p>
                    <p>Amount: {(parseInt(vnpParams['vnp_Amount']) / 100).toLocaleString('vi-VN')} VND</p>
                    <Link to='/'>Go to Homepage</Link> | <Link to='/orders'>View Your Orders</Link>
                </div>
            )}
            {paymentStatus === 'failed' && (
                <div style={{ color: 'red' }}>
                    <h2>Failed!</h2>
                    <p>{message}</p>
                    {vnpParams['vnp_TxnRef'] && <p>Order ID (vnp_TxnRef): {vnpParams['vnp_TxnRef']}</p>}
                    <p>If you believe this is an error, please contact support.</p>
                    <Link to='/checkout'>Try Again</Link> | <Link to='/'>Go to Homepage</Link>
                </div>
            )}
            <hr style={{ margin: '20px 0' }} />
            <h4>VNPAY Response Details (for debugging):</h4>
            <pre style={{ textAlign: 'left', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
                {JSON.stringify(vnpParams, null, 2)}
            </pre>
        </div>
    );
}

export default PaymentResultPage;
