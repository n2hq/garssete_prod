import { BiSolidStar as Star } from "react-icons/bi"

type RatingBoxProps = {
    rating: number // e.g., 3.6
}

export default function RatingBox({ rating }: RatingBoxProps) {
    return (
        <div className="flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => {
                const fillPercent = Math.max(0, Math.min(1, rating - i)) * 100

                return (
                    <div
                        key={i}
                        className={`relative w-[20px] h-[20px] bg-red-300 rounded-full 
                            overflow-hidden flex place-items-center
                            place-content-center`}
                    >
                        <div
                            className={`absolute inset-0 bg-green-400  z-[0]`}
                            style={{ width: `${fillPercent}%` }}
                        />
                        <Star className="relative z-[0] w-[14px] h-[14px] text-black" fill="currentColor" />
                    </div>
                )
            })}
        </div>
    )
}
