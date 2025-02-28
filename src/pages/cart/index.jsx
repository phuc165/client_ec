import styles from '../../styles/components/cart.module.scss';
import clsx from 'clsx';

function Cart() {
    return (
        <div className={clsx(styles.container)}>
            <h1>Cart</h1>
        </div>
    );
}

export default Cart;
