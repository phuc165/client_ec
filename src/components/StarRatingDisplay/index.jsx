import FullStar from '../../assets/svg/FullStar';
import HalfStar from '../../assets/svg/HalfStar';
import EmptyStar from '../../assets/svg/EmptyStar';

const StarRatingDisplay = ({ rating = 0, maxStars = 5 }) => {
    // Calculate full, half and empty stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div>
            {/* Full stars */}
            {[...Array(fullStars)].map((_, i) => (
                <FullStar key={`full-${i}`} />
            ))}

            {/* Half star if needed */}
            {hasHalfStar && <HalfStar />}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <EmptyStar key={`empty-${i}`} />
            ))}
        </div>
    );
};

export default StarRatingDisplay;
