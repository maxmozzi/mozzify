import Image, { StaticImageData } from 'next/image';
import styles from './product-gallery.module.css';

interface ProductGalleryProps {
    images: (string | StaticImageData)[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    // If no images, use a placeholder
    const displayImages = images.length > 0 ? images : ['/placeholder.jpg'];

    return (
        <div className={styles.gallery}>
            {displayImages.map((img, idx) => (
                <div key={idx} className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={img}
                            alt={`Product View ${idx + 1}`}
                            fill
                            className={styles.mainImage}
                            priority={idx < 2} // Priority for the first row
                            quality={100}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
