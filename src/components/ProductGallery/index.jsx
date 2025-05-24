import React, { useState, useEffect } from 'react';
import styles from '../../styles/core/imageGallery.module.scss';
import clsx from 'clsx';

const ImageGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(images?.[0] || '');
    const [imageError, setImageError] = useState({});

    // Update main image when images prop changes
    useEffect(() => {
        if (images && images.length > 0) {
            setMainImage(images[0]);
        }
    }, [images]);

    const handleThumbnailClick = (image, index) => {
        if (!imageError[index]) {
            setMainImage(image);
        }
    };

    const handleImageError = (index) => {
        setImageError((prev) => ({
            ...prev,
            [index]: true,
        }));
    };

    const handleImageLoad = (index) => {
        setImageError((prev) => ({
            ...prev,
            [index]: false,
        }));
    };

    // Filter out broken images
    const validImages = images?.filter((image, index) => image && !imageError[index]) || [];

    if (!validImages.length) {
        return (
            <div className={clsx(styles.image_gallery_container)}>
                <div className={clsx(styles.main_image_display)}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '300px',
                            color: '#9ca3af',
                            fontSize: '1.1rem',
                        }}
                    >
                        No images available
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={clsx(styles.image_gallery_container)}>
            {/* Thumbnails column */}
            <div className={clsx(styles.thumbnail_container)}>
                {validImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Product view ${index + 1}`}
                        className={clsx({
                            [styles.active]: mainImage === image,
                        })}
                        onClick={() => handleThumbnailClick(image, index)}
                        onError={() => handleImageError(index)}
                        onLoad={() => handleImageLoad(index)}
                        loading='lazy'
                    />
                ))}
            </div>

            {/* Main image display area */}
            <div className={clsx(styles.main_image_display)}>
                {mainImage ? (
                    <img
                        src={mainImage}
                        alt='Main product view'
                        onError={(e) => {
                            // Fallback to first available image if main image fails
                            const fallbackImage = validImages.find((img) => img !== mainImage);
                            if (fallbackImage) {
                                setMainImage(fallbackImage);
                            }
                        }}
                    />
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: '#9ca3af',
                            fontSize: '1.1rem',
                        }}
                    >
                        Image not available
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageGallery;
