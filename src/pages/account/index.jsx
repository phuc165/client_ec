import styles from '../../styles/core/account.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

import ProfileContent from '../../components/ProfileContent';
import AddressBookContent from '../../components/AddressBookContent';
import PaymentOptionsContent from '../../components/PaymentOptionsContent';
import OrdersContent from '../../components/OrdersContent';

function Account() {
    const [selectedItemLabel, setSelectedItemLabel] = useState('My Profile');

    const sidebarContentMap = {
        'My Profile': <ProfileContent />,
        'Address Book': <AddressBookContent />,
        'My Payment Options': <PaymentOptionsContent />,
        'My Orders': <OrdersContent />,
    };

    // Get the list of sidebar labels from the map keys
    const sidebarItemsLabels = Object.keys(sidebarContentMap);

    // Function to handle sidebar item clicks
    const handleItemClick = (itemLabel) => {
        setSelectedItemLabel(itemLabel); // Update the state with the clicked item's label
    };

    // Determine which content component to render based on the selectedItemLabel
    const CurrentContentComponent = sidebarContentMap[selectedItemLabel];

    return (
        <div className={clsx(styles.container)}>
            {/* Sidebar */}
            <div className={clsx(styles.sidebar)}>
                <h2 className={clsx(styles.title)}>Manage My Account</h2>
                <ul className={clsx(styles.sidebarItems)}>
                    {sidebarItemsLabels.map((itemLabel) => (
                        <div
                            key={itemLabel}
                            onClick={() => handleItemClick(itemLabel)}
                            className={clsx(styles.item, selectedItemLabel === itemLabel && styles.active)}
                        >
                            {itemLabel}
                        </div>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className={clsx(styles.content)}>{CurrentContentComponent}</div>
        </div>
    );
}

export default Account;
