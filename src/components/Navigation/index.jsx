import styles from '../../styles/components/navigation.module.scss';
import clsx from 'clsx';

import LeftArrowButton from '../LeftArrowButton';
import RightArrowButton from '../RightArrowButton';

function Navigation({ limit, skip, totalProducts, onNextPage, onPrevPage }) {
    // Compute whether buttons should be disabled
    const isPrevDisabled = skip === 0;
    const isNextDisabled = skip + limit >= totalProducts;

    return (
        <div className={clsx(styles.navigation)}>
            <LeftArrowButton onClick={onPrevPage} disabled={isPrevDisabled} />
            <RightArrowButton onClick={onNextPage} disabled={isNextDisabled} />
        </div>
    );
}

export default Navigation;
