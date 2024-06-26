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
    const [manualRating, setManualRating] = useState(0);
    const [autoRating, setAutoRating] = useState(0);
    const [trackRatings, setRated] = useState(tracks);

    useEffect(() => {
        const total = trackRatings.reduce((acc, curr) => acc + curr.value, 0);
        const rated = trackRatings.filter((track) => track.value !== 0);
        const avg = rated.length ? total / rated.length : 0;
        setAutoRating(avg);
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
    }

    return (
        <>
            <div className="relative flex flex-col gap-4 p-2 bg-black hover:shadow-md rounded-xl">
                <div className="relative flex items-center justify-center w-full rounded-lg overflow-clip aspect-[7/5]">
                    <img
                        src={album.images[0].url}
                        alt={album.id}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 flex flex-col w-[calc(100%_-_1rem)] mb-2 rounded-lg gap-1 p-2 bg-[#111827BF]">
                        <p className="text-sm font-medium lg:font-semibold md:text-lg text-zinc-100 line-clamp-3">
                            {album.name}
                        </p>
                        <p className="text-xs md:text-sm text-zinc-400">
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
                </div>
                <Button
                    onClick={() => handleDelete(album)}
                    variant="icon"
                    className="absolute top-2 right-2"
                >
                    <X />
                </Button>
                <Button
                    onClick={() => setOpen(!open)}
                    variant="icon"
                    className="absolute bottom-2 right-2"
                >
                    {open ? <ChevronUp /> : <ChevronDown />}
                </Button>
                {open && (
                    <>
                        <p>Rating</p>
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
                        {toggle == "manual" && (
                            <Selector
                                value={manualRating}
                                handleRating={(e) =>
                                    setManualRating(Number(e.currentTarget.id))
                                }
                            />
                        )}
                        {toggle == "auto" && (
                            <>
                                {autoRating === 0 ? (
                                    <p className="pl-2 text-xs">
                                        Rate all the tracks to set the album's
                                        average rating
                                    </p>
                                ) : (
                                    <p className="pl-2 font-medium">
                                        <span className="text-orange-400">
                                            {autoRating % 1 === 0
                                                ? autoRating
                                                : autoRating.toFixed(1)}{" "}
                                        </span>
                                        / 5
                                    </p>
                                )}
                            </>
                        )}
                        <div className="flex flex-col w-full gap-2 pb-10 text-xs bg-black rounded-xl top-full md:text-sm">
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
        </>
    );
};
