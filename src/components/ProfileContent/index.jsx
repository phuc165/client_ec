import styles from '../../styles/core/profileContent.module.scss';
import clsx from 'clsx';

import ViewAllButton from '../ViewAllButton';

function ProfileContent() {
    return (
        <div className={clsx(styles.container)}>
            <form action='' className={clsx(styles.formContent)}>
                <div className={clsx(styles.title)}>Edit Your Profile</div>

                {/* First & Last Name Section */}
                <div className={clsx(styles.section)}>
                    <div className={clsx(styles.field)}>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' id='firstName' placeholder='Ha' />
                    </div>
                    <div className={clsx(styles.field)}>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' id='lastName' placeholder='Phuc' />
                    </div>
                </div>

                {/* Email & Address Section */}
                <div className={clsx(styles.section)}>
                    <div className={clsx(styles.field)}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' placeholder='HaPhuc@gmail.com' />
                    </div>
                    <div className={clsx(styles.field)}>
                        <label htmlFor='address'>Address</label>
                        <input type='text' id='address' placeholder='117 Nguyen Huu Canh, F22, BT' />
                    </div>
                </div>

                {/* Password Section */}
                <div className={clsx(styles.section)}>
                    <div className={clsx(styles.field)}>
                        <label htmlFor='currentPassword'>Password Changes</label>
                        <input type='password' id='currentPassword' placeholder='Current Password' />
                        <input type='password' placeholder='New Password' />
                        <input type='password' placeholder='Confirm New Password' />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={clsx(styles.section_2)}>
                    <ViewAllButton content='Cancel' page='account' className='cancel' />
                    <ViewAllButton content='Save Changes' page='account' className='save' />
                </div>
            </form>
        </div>
    );
}

export default ProfileContent;
