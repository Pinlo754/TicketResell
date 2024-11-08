import amazing_face from "../../assets/amazing_face.png";
import happy_face from "../../assets/happy_face.png";
import smile_face from "../../assets/smile_face.png";
import sad_face from "../../assets/sad_face.png";
import angry_face from "../../assets/angry_face.png";
import { useState } from "react";

const useRenderRating = () => {

    type Rate = {
        id: number,
        img: string,
        title: string,
    };

    const rating : Rate[] = [
        {
            id: 1,
            img: angry_face,
            title: "Tệ",
        },
        {
            id: 2,
            img: sad_face,
            title: "Không hài lòng",
        },
        {
            id: 3,
            img: smile_face,
            title: "Bình thường",
        },
        {
            id: 4,
            img: happy_face,
            title: "Hài lòng",
        },
        {
            id: 5,
            img: amazing_face,
            title: "Tuyệt vời",
        },
    ];
    

    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    return {
        rating,
        selectedRating,
        setSelectedRating,
    };
}

export default useRenderRating;