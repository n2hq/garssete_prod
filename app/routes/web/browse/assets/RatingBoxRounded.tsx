import { BiSolidStar as Star } from "react-icons/bi"

type RatingBoxProps = {
    rating: number // e.g., 3.6
}

export default function RatingBoxRounded({ rating }: RatingBoxProps) {
    return (
        <div className="flex gap-x-[2px]">
            {Array.from({ length: 5 }).map((_, i) => {
                const fillPercent = Math.max(0, Math.min(1, rating - i)) * 100

                return (
                    <div
                        key={i}
                        className={`relative w-[17px] h-[17px] bg-white rounded-full 
                            overflow-hidden flex place-items-center border-[1px]
                            place-content-center border-gray-500`}
                    >
                        <div
                            className={`absolute inset-0 bg-green-600 z-[0]`}
                            style={{ width: `${fillPercent}%` }}
                        />

                    </div>
                )
            })}
        </div>
    )
}
