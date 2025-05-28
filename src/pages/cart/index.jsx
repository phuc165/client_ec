import { useState } from 'react';
import styles from '../../styles/core/cart.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router';

import QtyUpArrow from '../../assets/svg/QtyUpArrow';
import QtyDownArrow from '../../assets/svg/QtyDownArrow';
import ViewAllButton from '../../components/ViewAllButton';

function Cart() {
    const carts = {
        _id: {
            $oid: '67c97c655cfdf28ea61c2b0a',
        },
        'Unnamed: 1': 0,
        name: 'GLUN Bolt Electronic Portable Fishing Hook Type Digital LED Screen Luggage Weighing Scale, 50 kg/110 Lb (Black)',
        main_category: 'Accessories',
        sub_category: 'Bags & Luggage',
        image: 'http://assets.myntassets.com/v1/images/style/properties/7a5b82d1372a7a5c6de67ae7a314fd91_images.jpg',
        link: 'https://www.amazon.in/GLUN-Digital-Electronic-Portable-Weighing/dp/B07PK41FL4/ref=sr_1_5?qid=1679143885&s=luggage&sr=1-5',
        ratings: 3.9,
        no_of_ratings: '18,662',
        discount_price: 278,
        actual_price: 899,
        image_2: 'https://m.media-amazon.com/images/I/51JFb7FctDL._AC_UL320_.jpg',
        image_3: 'http://assets.myntassets.com/v1/images/style/properties/02e4e32cd9d09052f0ec3d46fa747d39_images.jpg',
        image_4: 'http://assets.myntassets.com/v1/images/style/properties/93aa34922c6446706c003ba2255747f5_images.jpg',
        description: 'A versatile and durable product for everyday use.',
        attributes: [
            {
                name: 'color',
                options: ['Black', 'Gray', 'Red'],
            },
            {
                name: 'size',
                options: ['Medium', 'Large', 'Small'],
            },
        ],
        variations: [
            {
                attributes: {
                    color: 'Black',
                    size: ['Medium', 'Large', 'Small'],
                },
                images: [
                    'http://assets.myntassets.com/v1/images/style/properties/7a5b82d1372a7a5c6de67ae7a314fd91_images.jpg',
                    'https://m.media-amazon.com/images/I/51JFb7FctDL._AC_UL320_.jpg',
                    'http://assets.myntassets.com/v1/images/style/properties/02e4e32cd9d09052f0ec3d46fa747d39_images.jpg',
                    'http://assets.myntassets.com/v1/images/style/properties/93aa34922c6446706c003ba2255747f5_images.jpg',
                ],
            },
            {
                attributes: {
                    color: 'Gray',
                    size: ['Medium', 'Large', 'Small'],
                },
                images: [
                    'http://assets.myntassets.com/v1/images/style/properties/fee54b57fcd02b7c07d42b0918025099_images.jpg',
                    'https://m.media-amazon.com/images/I/61H7ZKZXK+L._AC_UL320_.jpg',
                    'https://m.media-amazon.com/images/I/310PQyzP-KL._AC_UL320_.jpg',
                    'https://m.media-amazon.com/images/I/71niDOUbw8L._AC_UL320_.jpg',
                ],
            },
            {
                attributes: {
                    color: 'Red',
                    size: ['Medium', 'Large', 'Small'],
                },
                images: [
                    'https://m.media-amazon.com/images/I/713Cwx85MbL._AC_UL320_.jpg',
                    'https://m.media-amazon.com/images/I/71UO6eXC1QL._AC_UL320_.jpg',
                    'https://m.media-amazon.com/images/I/71fNICQ+fJL._AC_UL320_.jpg',
                    'https://m.media-amazon.com/images/I/71klew1PDYL._AC_UL320_.jpg',
                ],
            },
        ],
    };
    const qty = 2;
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(quantity + 1);
    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const refreshPage = () => {
        window.location.reload();
    };
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
                    </tr>
                </thead>
                <tbody>
                    <tr className={clsx(styles.cartItem)}>
                        <td className={clsx(styles.imgNtitle)}>
                            <div className={clsx(styles.productImg)}>
                                <img src={carts.image} alt='' />
                            </div>
                            <div className={clsx(styles.productName)}>{carts.name}</div>
                        </td>
                        <td>Black, Small</td>
                        <td>{carts.discount_price}</td>
                        <td>
                            <div className={clsx(styles.qtyCounter)}>
                                <span>{quantity.toString().padStart(2, '0')}</span>
                                <div className={clsx(styles.arrowContainer)}>
                                    <div onClick={increment} aria-label='Increase quantity' className={clsx(styles.arrow)}>
                                        <QtyUpArrow />
                                    </div>
                                    <div onClick={decrement} aria-label='Decrease quantity' className={clsx(styles.arrow)}>
                                        <QtyDownArrow />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>{carts.discount_price * quantity}</td>
                    </tr>
                    <tr className={clsx(styles.cartItem)}>
                        <td className={clsx(styles.imgNtitle)}>
                            <div className={clsx(styles.productImg)}>
                                <img src={carts.image} alt='' />
                            </div>
                            <div className={clsx(styles.productName)}>{carts.name}</div>
                        </td>
                        <td>Black, Small</td>
                        <td>{carts.discount_price}</td>
                        <td>
                            <div className={clsx(styles.qtyCounter)}>
                                <span>{quantity.toString().padStart(2, '0')}</span>
                                <div className={clsx(styles.arrowContainer)}>
                                    <div onClick={increment} aria-label='Increase quantity' className={clsx(styles.arrow)}>
                                        <QtyUpArrow />
                                    </div>
                                    <div onClick={decrement} aria-label='Decrease quantity' className={clsx(styles.arrow)}>
                                        <QtyDownArrow />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>{carts.discount_price * quantity}</td>
                    </tr>
                </tbody>
            </table>

            <div className={clsx(styles.belowTable)}>
                <Link to='/' className={clsx(styles.returnShop)}>
                    Return To Shop
                </Link>
                <div onClick={refreshPage} className={clsx(styles.returnShop)}>
                    Update Cart
                </div>
            </div>
            <div className={clsx(styles.belowCart)}>
                <div className={clsx(styles.couponContainer)}>
                    <input type='text' placeholder='Coupon Code' className={clsx(styles.couponInput)} />
                    <ViewAllButton content='Apply Coupon' page='cart' className='coupon' />
                </div>
                <div className={clsx(styles.checkoutContainer)}>
                    <div className={clsx(styles.checkoutTitle)}>Cart Total</div>
                    <div className={clsx(styles.checkoutItem)}>
                        <span>Subtotal:</span> <span>1000</span>
                    </div>
                    <hr className={clsx(styles.checkoutLine)} />
                    <div className={clsx(styles.checkoutItem)}>
                        <span>Shipping:</span> <span>Free</span>
                    </div>
                    <hr className={clsx(styles.checkoutLine)} />
                    <div className={clsx(styles.checkoutItem)}>
                        <span>Total:</span> <span>1000</span>
                    </div>
                    <ViewAllButton content='Process To Check Out' page='cart' className='checkout' />
                </div>
            </div>
        </div>
    );
}

export default Cart;
