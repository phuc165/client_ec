// src/components/Cart.js
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import styles from '../../styles/core/cart.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router';
import QtyUpArrow from '../../assets/svg/QtyUpArrow';
import QtyDownArrow from '../../assets/svg/QtyDownArrow';
import TrashIcon from '../../assets/svg/TrashIcon';
import ViewAllButton from '../../components/ViewAllButton';

function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((sum, item) => sum + item.productData.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className={clsx(styles.container)}>
            <table className={clsx(styles.cartContainer)}>
                <thead>
                    <tr className={clsx(styles.title)}>
                        <th>Product</th>
                        <th>Variant</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length === 0 ? (
                        <tr>
                            <td colSpan='6'>Your cart is empty</td>
                        </tr>
                    ) : (
                        cartItems.map((item, index) => (
                            <tr key={index} className={clsx(styles.cartItem)}>
                                <td className={clsx(styles.imgNtitle)}>
                                    <div className={clsx(styles.productImg)}>
                                        <img src={item.productData.image} alt={item.productData.name} />
                                    </div>
                                    <div className={clsx(styles.productName)}>{item.productData.name}</div>
                                </td>
                                <td>
                                    {item.attributes.color}, {item.attributes.size}
                                </td>
                                <td>${item.productData.price.toFixed(2)}</td>
                                <td>
                                    <div className={clsx(styles.qtyCounter)}>
                                        <span>{item.quantity.toString().padStart(2, '0')}</span>
                                        <div className={clsx(styles.arrowContainer)}>
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        updateQuantity({
                                                            productId: item.productId,
                                                            attributes: item.attributes,
                                                            quantity: item.quantity + 1,
                                                        }),
                                                    )
                                                }
                                                aria-label='Increase quantity'
                                                className={clsx(styles.arrow)}
                                            >
                                                <QtyUpArrow />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    item.quantity > 1 &&
                                                    dispatch(
                                                        updateQuantity({
                                                            productId: item.productId,
                                                            attributes: item.attributes,
                                                            quantity: item.quantity - 1,
                                                        }),
                                                    )
                                                }
                                                aria-label='Decrease quantity'
                                                className={clsx(styles.arrow)}
                                            >
                                                <QtyDownArrow />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>${(item.productData.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                removeFromCart({
                                                    productId: item.productId,
                                                    attributes: item.attributes,
                                                }),
                                            )
                                        }
                                        className={clsx(styles.removeButton)}
                                    >
                                        <TrashIcon />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className={clsx(styles.belowTable)}>
                <Link to='/' className={clsx(styles.returnShop)}>
                    Return To Shop
                </Link>
            </div>
            <div className={clsx(styles.belowCart)}>
                <div className={clsx(styles.couponContainer)}>
                    <input type='text' placeholder='Coupon Code' className={clsx(styles.couponInput)} />
                    <ViewAllButton content='Apply Coupon' page='cart' className='coupon' />
                </div>
                <div className={clsx(styles.checkoutContainer)}>
                    <div className={clsx(styles.checkoutTitle)}>Cart Total</div>
                    <div className={clsx(styles.checkoutItem)}>
                        <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <hr className={clsx(styles.checkoutLine)} />
                    <div className={clsx(styles.checkoutItem)}>
                        <span>Shipping:</span> <span>Free</span>
                    </div>
                    <hr className={clsx(styles.checkoutLine)} />
                    <div className={clsx(styles.checkoutItem)}>
                        <span>Total:</span> <span>${total.toFixed(2)}</span>
                    </div>
                    <ViewAllButton content='Process To Check Out' page='cart' className='checkout' />
                </div>
            </div>
        </div>
    );
}

export default Cart;
