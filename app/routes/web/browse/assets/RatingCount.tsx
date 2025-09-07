import { useEffect, useState } from "react"
import { formatNumber } from "~/lib/lib"

export const RatingCount = ({ averageRating }: any) => {
    const [avgRating, setAvgRating] = useState(0)
    useEffect(() => {
        if (averageRating !== null && averageRating !== undefined) {
            setAvgRating(averageRating)
        }
    }, [averageRating])
    return (
        <div className={`text-blue-700`}>
            ({formatNumber(Number(avgRating))})
        </div>
    )
}