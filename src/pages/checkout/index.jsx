import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCart } from '../../redux/slices/cartSlice';
import { getAddresses, addAddress } from '../../redux/slices/authSlice';
import styles from '../../styles/core/checkOut.module.scss';
import clsx from 'clsx';

function CheckOut() {
    const dispatch = useDispatch();
    const { items: cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
    const { addresses, loading: addressLoading, userInfo } = useSelector((state) => state.auth);

    const [selectedAddress, setSelectedAddress] = useState('');
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        province: '',
        town: '',
        block: '',
        address: '',
    });

    useEffect(() => {
        dispatch(fetchCart());
        if (userInfo) {
            dispatch(getAddresses());
        }
    }, [dispatch, userInfo]);

    // Auto-select first address if available
    useEffect(() => {
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]._id);
        }
    }, [addresses, selectedAddress]);

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        dispatch(addAddress(newAddress)).then((result) => {
            if (result.type === 'auth/addAddress/fulfilled') {
                setSelectedAddress(result.payload._id);
                setShowAddressForm(false);
                setNewAddress({ province: '', town: '', block: '', address: '' });
            }
        });
    };

    const getSelectedAddressDetails = () => {
        return addresses.find((addr) => addr._id === selectedAddress);
    };

    if (cartLoading) {
        return <div className={clsx(styles.container)}>Loading cart...</div>;
    }

    if (cartError) {
        return <div className={clsx(styles.container)}>Error: {cartError}</div>;
    }

    if (cartItems.length === 0) {
        return <div className={clsx(styles.container)}>Your cart is empty.</div>;
    }

    if (!userInfo) {
        return <div className={clsx(styles.container)}>Please log in to proceed with checkout.</div>;
    }

    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.productData?.price || 0;
        return sum + price * item.quantity;
    }, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className={clsx(styles.container)}>
            <h1>CheckOut</h1>

            {/* Shipping Address Section */}
            <div className={clsx(styles.checkoutForm)}>
                <div className={clsx(styles.shippingDetails)}>
                    <h3>Shipping Address</h3>

                    {addressLoading ? (
                        <p>Loading addresses...</p>
                    ) : (
                        <>
                            {addresses.length > 0 ? (
                                <div className={clsx(styles.formGroup)}>
                                    <label>Select Delivery Address:</label>
                                    <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                                        <option value=''>Choose an address</option>
                                        {addresses.map((address) => (
                                            <option key={address._id} value={address._id}>
                                                {address.province}, {address.town}, {address.block}, {address.address}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <p>No saved addresses found.</p>
                            )}

                            <button type='button' className={clsx(styles.addAddressButton)} onClick={() => setShowAddressForm(!showAddressForm)}>
                                {showAddressForm ? 'Cancel' : 'Add New Address'}
                            </button>

                            {showAddressForm && (
                                <form onSubmit={handleAddressSubmit} className={clsx(styles.addressForm)}>
                                    <div className={clsx(styles.formGroup)}>
                                        <label htmlFor='province'>Province/City *</label>
                                        <input
                                            type='text'
                                            id='province'
                                            placeholder='Enter province/city'
                                            value={newAddress.province}
                                            onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className={clsx(styles.formGroup)}>
                                        <label htmlFor='town'>Town/District *</label>
                                        <input
                                            type='text'
                                            id='town'
                                            placeholder='Enter town/district'
                                            value={newAddress.town}
                                            onChange={(e) => setNewAddress({ ...newAddress, town: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className={clsx(styles.formGroup)}>
                                        <label htmlFor='block'>Block/Village</label>
                                        <input
                                            type='text'
                                            id='block'
                                            placeholder='Enter block/village'
                                            value={newAddress.block}
                                            onChange={(e) => setNewAddress({ ...newAddress, block: e.target.value })}
                                        />
                                    </div>
                                    <div className={clsx(styles.formGroup)}>
                                        <label htmlFor='address'>Number, Alley, Road *</label>
                                        <input
                                            type='text'
                                            id='address'
                                            placeholder='Enter number, alley, road'
                                            value={newAddress.address}
                                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <button type='submit' className={clsx(styles.saveAddressButton)}>
                                        Save Address
                                    </button>
                                </form>
                            )}

                            {selectedAddress && (
                                <div className={clsx(styles.selectedAddress)}>
                                    <h4>Delivery Address:</h4>
                                    <p>
                                        {getSelectedAddressDetails()?.province}, {getSelectedAddressDetails()?.town},{' '}
                                        {getSelectedAddressDetails()?.block}, {getSelectedAddressDetails()?.address}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Order Summary Section */}
            <div className={clsx(styles.cartSummary)}>
                <h2>Order Summary</h2>
                <table className={clsx(styles.cartTable)}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Variant</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.productData?.name || 'Product Name'}</td>
                                <td>
                                    {item.attributes?.color || 'N/A'}, {item.attributes?.size || 'N/A'}
                                </td>
                                <td>${(item.productData?.price || 0).toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>${((item.productData?.price || 0) * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={clsx(styles.totals)}>
                    <div>
                        <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Shipping:</span> <span>Free</span>
                    </div>
                    <div>
                        <span>Total:</span> <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <button className={clsx(styles.checkoutButton)} disabled={!selectedAddress}>
                    {selectedAddress ? 'Proceed to Payment' : 'Please Select Address'}
                </button>
            </div>
        </div>
    );
}

export default CheckOut;
