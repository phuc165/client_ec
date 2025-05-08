import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAddresses, addAddress, updateAddress, deleteAddress } from '../../redux/slices/authSlice';
import styles from '../../styles/core/addressBookContent.module.scss';
import clsx from 'clsx';
import ViewAllButton from '../ViewAllButton';

function AddressBookContent() {
    const dispatch = useDispatch();
    const { addresses, loading, error } = useSelector((state) => state.auth);

    const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [formData, setFormData] = useState({
        province: '',
        town: '',
        block: '',
        address: '',
    });

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    const handleEdit = (address) => {
        setFormMode('edit');
        setSelectedAddress(address);
        setFormData(address);
    };

    const handleDelete = (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            dispatch(deleteAddress(addressId));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formMode === 'add') {
            dispatch(addAddress(formData));
        } else if (formMode === 'edit') {
            dispatch(updateAddress({ addressId: selectedAddress._id, addressData: formData }));
        }
        setFormMode(null);
    };

    const handleAddNew = () => {
        setFormMode('add');
        setSelectedAddress(null);
        setFormData({ province: '', town: '', block: '', address: '' });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={clsx(styles.container)}>
            <h2>Your Address Book</h2>
            <div className={styles.addressList}>
                {addresses.length === 0 ? (
                    <p>You have no saved addresses.</p>
                ) : (
                    addresses.map((address) => (
                        <div key={address._id} className={styles.addressItem}>
                            <p>
                                {address.province}, {address.town}, {address.block}, {address.address}
                            </p>
                            <button onClick={() => handleEdit(address)}>Edit</button>
                            <button onClick={() => handleDelete(address._id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
            <button onClick={handleAddNew}>Add New Address</button>
            {formMode && (
                <div className={styles.formContent}>
                    <h3>{formMode === 'add' ? 'Add New Address' : 'Edit Address'}</h3>
                    <div className={styles.section}>
                        <div className={styles.field}>
                            <label htmlFor='province'>Province/City</label>
                            <input
                                type='text'
                                id='province'
                                value={formData.province}
                                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor='town'>Town/District</label>
                            <input type='text' id='town' value={formData.town} onChange={(e) => setFormData({ ...formData, town: e.target.value })} />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.field}>
                            <label htmlFor='block'>Block/Village</label>
                            <input
                                type='text'
                                id='block'
                                value={formData.block}
                                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor='address'>Number, Ally, Road</label>
                            <input
                                type='text'
                                id='address'
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={styles.section_2}>
                        <ViewAllButton content='Cancel' page='account' className='cancel' onClick={() => setFormMode(null)} />
                        <ViewAllButton content='Save Changes' page='account' className='save' onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddressBookContent;
