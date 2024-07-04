import { SimplifiedTrack } from "@spotify/web-api-ts-sdk";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "./ui/Svgs";

type TrackProps = {
    track: SimplifiedTrack;
};

export const Track = ({ track }: TrackProps) => {
    const [rating, setRating] = useState("");
    const [open, setOpen] = useState(false);

    function handleRating(e: React.MouseEvent) {
        const newRating = e.currentTarget.id;
        setRating(newRating);
    }

    return (
        <div
            className={`flex justify-between gap-2 p-2 rounded hover:bg-zinc-100 text-black ${
                open && "bg-white"
            }`}
            key={track.id}
            onClick={() => setOpen(!open)}
        >
            <p className="line-clamp-2">{track.name}</p>
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-end gap-2">
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
                            className={`font-black text-lg px-1 hover:cursor-pointer ${
                                rating === "F"
                                    ? "text-orange-400"
                                    : "text-zinc-400 hover:text-zinc-500"
                            }`}
                            id="F"
                            onClick={handleRating}
                        >
                            F
                        </div>
                        <div
                            className={`font-black text-lg px-1 hover:cursor-pointer ${
                                rating === "E"
                                    ? "text-orange-400"
                                    : "text-zinc-400 hover:text-zinc-500"
                            }`}
                            id="E"
                            onClick={handleRating}
                        >
                            E
                        </div>
                        <div
                            className={`font-black text-lg px-1 hover:cursor-pointer ${
                                rating === "D"
                                    ? "text-orange-400"
                                    : "text-zinc-400 hover:text-zinc-500"
                            }`}
                            id="D"
                            onClick={handleRating}
                        >
                            D
                        </div>
                        <div
                            className={`font-black text-lg px-1 hover:cursor-pointer ${
                                rating === "C"
                                    ? "text-orange-400"
                                    : "text-zinc-400 hover:text-zinc-500"
                            }`}
                            id="C"
                            onClick={handleRating}
                        >
                            C
                        </div>
                        <div
                            className={`font-black text-lg px-1 hover:cursor-pointer ${
                                rating === "B"
                                    ? "text-orange-400"
                                    : "text-zinc-400 hover:text-zinc-500"
                            }`}
                            id="B"
                            onClick={handleRating}
                        >
                            B
                        </div>
                        <div
                            className={`font-black text-lg px-1 hover:cursor-pointer ${
                                rating === "A"
                                    ? "text-orange-400"
                                    : "text-zinc-400 hover:text-zinc-500"
                            }`}
                            id="A"
                            onClick={handleRating}
                        >
                            A
                        </div>
                        <div
                            className={`font-black text-lg px-1 hover:cursor-pointer ${
                                rating === "S"
                                    ? "text-orange-400"
                                    : "text-zinc-400 hover:text-zinc-500"
                            }`}
                            id="S"
                            onClick={handleRating}
                        >
                            S
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
