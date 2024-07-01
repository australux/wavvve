import { Album } from "@spotify/web-api-ts-sdk";
import { Button } from "./ui/Button";
import { ChevronDown, ChevronUp, X } from "./ui/Svgs";
import { useEffect, useState } from "react";
import { Track } from "./Track";
import { Pill } from "./ui/Pill";
import { Selector } from "./ui/Selector";

type AlbumCardProps = {
    album: Album;
    handleDelete: (album: Album) => void;
};

export const AlbumCard = ({ album, handleDelete }: AlbumCardProps) => {
    const tracks = album.tracks.items.map((track) => ({
        id: track.id,
        value: 0,
    }));

    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState<"manual" | "auto">("manual");
    const [rating, setRating] = useState(0);
    const [trackRatings, setRated] = useState(tracks);

    useEffect(() => {
        const total = trackRatings.reduce((acc, curr) => acc + curr.value, 0);
        const rated = trackRatings.filter((track) => track.value !== 0);
        const avg = rated.length ? total / rated.length : 0;
        setRating(avg);
    }, [trackRatings]);

    function calculateRating(rating: number, id: string) {
        const target = trackRatings.findIndex((track) => track.id === id);
        const update = { ...trackRatings[target], value: rating };
        const updatedTracks = [...trackRatings];
        updatedTracks[target] = update;
        setRated(updatedTracks);
    }

    function handleToggle(e: React.MouseEvent) {
        setToggle(e.currentTarget.id as "manual" | "auto");
        setRating(0);
    }

    return (
        <>
            <div className="relative flex flex-col gap-2 p-2 bg-white hover:shadow-md">
                <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col">
                        <p className="font-bold text-black line-clamp-1">
                            {album.name}
                        </p>
                        <p className="text-xs font-medium text-black line-clamp-1">
                            {album.artists.length > 1 ? (
                                album.artists.map((artist, i) =>
                                    i == album.artists.length - 1 ? (
                                        <span key={i}>{artist.name}</span>
                                    ) : (
                                        <span key={i}>{artist.name}, </span>
                                    )
                                )
                            ) : (
                                <span>{album.artists[0].name}</span>
                            )}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {rating != 0 && !open && (
                            <p className="flex text-sm w-max">
                                <span className="text-orange-400">
                                    {rating}
                                </span>
                                <span
                                    className={
                                        rating == 5
                                            ? "text-orange-400"
                                            : "text-zinc-400"
                                    }
                                >
                                    /5
                                </span>
                            </p>
                        )}
                        <Button
                            onClick={() => handleDelete(album)}
                            variant="icon"
                        >
                            <X className="w-4 h-4 text-black stroke-2" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full rounded overflow-clip aspect-custom">
                    <img
                        src={album.images[0].url}
                        alt={album.id}
                        height={600}
                        width={600}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div
                    className={
                        open
                            ? "flex flex-col gap-2 px-2 py-1 rounded bg-zinc-50 w-full max-h-full opacity-100 transition-all duration-300"
                            : "opacity-0 max-h-0"
                    }
                >
                    <p className="text-sm text-zinc-600">Rating</p>
                    <div className="flex gap-2">
                        <Pill
                            text="manual"
                            toggle={toggle}
                            handleToggle={(e) => handleToggle(e)}
                        />
                        <Pill
                            text="auto"
                            toggle={toggle}
                            handleToggle={(e) => handleToggle(e)}
                        />
                    </div>
                    {toggle === "manual" && (
                        <Selector
                            value={rating}
                            handleRating={(e) =>
                                setRating(Number(e.currentTarget.id))
                            }
                        />
                    )}
                    {toggle === "auto" && (
                        <>
                            <div className="h-6">
                                {rating === 0 ? (
                                    <p className="pl-2 text-xs text-zinc-400">
                                        Rate the tracks to set the album's
                                        average rating
                                    </p>
                                ) : (
                                    <p className="pl-2 font-medium text-zinc-400">
                                        <span className="text-orange-400">
                                            {rating % 1 === 0
                                                ? rating
                                                : rating.toFixed(1)}{" "}
                                        </span>
                                        / 5
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col w-full gap-2 text-xs md:text-sm">
                                <div className="flex justify-between w-full px-2 pb-2 border-b text-zinc-400 border-zinc-400">
                                    <p>Title</p>
                                    <p>Rating</p>
                                </div>
                                {album.tracks.items.map((track) => (
                                    <Track
                                        track={track}
                                        key={track.id}
                                        calculate={calculateRating}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div
                    className="z-10 flex justify-end w-full h-full md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    <Button variant="icon">
                        {open ? (
                            <ChevronUp className="w-4 h-4 text-black stroke-2" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-black stroke-2" />
                        )}
                    </Button>
                </div>
                <div className="justify-end hidden w-full h-max md:flex">
                    <Button
                        variant="icon"
                        onClick={() =>
                            console.log(`opening modal or sum ${album.name}`)
                        }
                    >
                        <ChevronDown className="w-4 h-4 text-black stroke-2" />
                    </Button>
                </div>
            </div>
        </>
    );
};
