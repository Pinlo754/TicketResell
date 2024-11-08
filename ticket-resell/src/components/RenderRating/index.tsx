import useRenderRating from "./useRenderRating";

interface RenderRatingProps {
    onChange: (rating: number) => void;
}

const RenderRating: React.FC<RenderRatingProps> = ({ onChange }) => {

    const {
        rating,
        selectedRating,
        setSelectedRating,
    } = useRenderRating();

    const handleClick = (rateId: number) => {
        setSelectedRating(rateId);
        onChange(rateId);
    };

    return (
        <div className="flex space-x-2">
            {rating.map((rate) => (
                <div 
                key={rate.id} 
                className={`border rounded-full w-fit p-2 cursor-pointer opacity-60 hover:opacity-100 hover:shadow-lg hover:shadow-[#87CBB9] ${
                    selectedRating === rate.id ? "opacity-100 shadow-lg shadow-[#87CBB9]" : ""
                }`}
                onClick={() => handleClick(rate.id)}
                >
                    <img
                    src={rate.img}
                    alt={rate.title}
                    title={rate.title}
                    className="w-8 h-8" 
                    onClick={() => onChange(rate.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default RenderRating;