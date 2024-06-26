import { SimplifiedTrack } from "@spotify/web-api-ts-sdk";
import { useState } from "react";

type TrackProps = {
    track: SimplifiedTrack;
    calculate: (rating: number, id: string) => void;
};

export const Track = ({ track, calculate }: TrackProps) => {
    const [rating, setRating] = useState(0);

    function handleRating(e: React.MouseEvent) {
        const newRating = Number(e.currentTarget.id);
        setRating(newRating);
        calculate(newRating, track.id);
    }

    return (
        <div
            className="grid grid-cols-[4fr_1fr] p-2 items-center rounded hover:bg-zinc-900"
            key={track.id}
        >
            <p>{track.name}</p>
            <div className="flex gap-1">
                <div
                    className={`w-4 h-4 rounded-full ${
                        rating >= 1 ? "bg-orange-400" : "bg-zinc-400"
                    }`}
                    id="1"
                    onClick={(e) => handleRating(e)}
                ></div>
                <div
                    className={`w-4 h-4 rounded-full ${
                        rating >= 2 ? "bg-orange-400" : "bg-zinc-400"
                    }`}
                    id="2"
                    onClick={(e) => handleRating(e)}
                ></div>
                <div
                    className={`w-4 h-4 rounded-full ${
                        rating >= 3 ? "bg-orange-400" : "bg-zinc-400"
                    }`}
                    id="3"
                    onClick={(e) => handleRating(e)}
                ></div>
                <div
                    className={`w-4 h-4 rounded-full ${
                        rating >= 4 ? "bg-orange-400" : "bg-zinc-400"
                    }`}
                    id="4"
                    onClick={(e) => handleRating(e)}
                ></div>
                <div
                    className={`w-4 h-4 rounded-full ${
                        rating >= 5 ? "bg-orange-400" : "bg-zinc-400"
                    }`}
                    id="5"
                    onClick={(e) => handleRating(e)}
                ></div>
            </div>
        </div>
    );
};
