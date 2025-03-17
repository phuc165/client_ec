import styles from '../../styles/components/saleOffProduct.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from '../Timer';

function SaleOffProduct() {
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.contentSide}>
                <div className={styles.categoryLabel}>Categories</div>
                <h1 className={styles.bannerTitle}>
                    Enhance Your
                    <br />
                    Music Experience
                </h1>

                <Timer timerName={'sale off product timer'} styleType='sale-off' />

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
