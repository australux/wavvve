import { SimplifiedTrack } from "@spotify/web-api-ts-sdk";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "./ui/Svgs";

type TrackProps = {
    track: SimplifiedTrack;
    calculate: (rating: number, id: string) => void;
};

export const Track = ({ track, calculate }: TrackProps) => {
    const [rating, setRating] = useState(0);
    const [open, setOpen] = useState(false);

    function handleRating(e: React.MouseEvent) {
        const newRating = Number(e.currentTarget.id);
        setRating(newRating);
        calculate(newRating, track.id);
    }

    return (
        <div
            className={`grid grid-cols-[4fr_1fr] p-2 rounded hover:bg-zinc-100 text-black ${
                open && "bg-white"
            }`}
            key={track.id}
            onClick={() => setOpen(!open)}
        >
            <p>{track.name}</p>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-end gap-2">
                    {/* {rating ? (
                        <span className="flex text-xs text-orange-400 w-max">
                            {rating}/5
                        </span>
                    ) : (
                        ""
                    )} */}
                    {open ? (
                        <ChevronUp
                            className={`w-4 h-4 stroke-2 ${
                                rating && "text-orange-400"
                            }`}
                        />
                    ) : (
                        <ChevronDown
                            className={`w-4 h-4 stroke-2 ${
                                rating && "text-orange-400"
                            }`}
                        />
                    )}
                </div>
                {open && (
                    <div className="flex gap-1">
                        <div
                            className={`w-5 h-5 rounded-full ${
                                rating >= 1 ? "bg-orange-400" : "bg-zinc-400"
                            }`}
                            id="1"
                            onClick={(e) => handleRating(e)}
                        ></div>
                        <div
                            className={`w-5 h-5 rounded-full ${
                                rating >= 2 ? "bg-orange-400" : "bg-zinc-400"
                            }`}
                            id="2"
                            onClick={(e) => handleRating(e)}
                        ></div>
                        <div
                            className={`w-5 h-5 rounded-full ${
                                rating >= 3 ? "bg-orange-400" : "bg-zinc-400"
                            }`}
                            id="3"
                            onClick={(e) => handleRating(e)}
                        ></div>
                        <div
                            className={`w-5 h-5 rounded-full ${
                                rating >= 4 ? "bg-orange-400" : "bg-zinc-400"
                            }`}
                            id="4"
                            onClick={(e) => handleRating(e)}
                        ></div>
                        <div
                            className={`w-5 h-5 rounded-full ${
                                rating >= 5 ? "bg-orange-400" : "bg-zinc-400"
                            }`}
                            id="5"
                            onClick={(e) => handleRating(e)}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};
