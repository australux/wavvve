import { Album } from "@spotify/web-api-ts-sdk";
import { Button } from "./ui/Button";
import { ChevronDown, ChevronUp, X } from "./ui/Svgs";
import { useState } from "react";

type AlbumCardProps = {
    album: Album;
    handleDelete: (album: Album) => void;
};

export const AlbumCard = ({ album, handleDelete }: AlbumCardProps) => {
    const [open, setOpen] = useState(false);

    function toggleTab() {
        setOpen(!open);
    }

    return (
        <>
            <div className="relative flex flex-col gap-4 p-2 bg-black hover:shadow-md rounded-xl">
                <div className="relative flex items-center justify-center w-full rounded-lg overflow-clip aspect-[16/11]">
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
                    onClick={toggleTab}
                    variant="icon"
                    className="absolute bottom-2 right-2"
                >
                    {open ? <ChevronUp /> : <ChevronDown />}
                </Button>
                {open && (
                    <>
                        <p>Rating</p>
                        <div className="flex flex-col w-full gap-2 pb-10 text-xs bg-black rounded-xl top-full md:text-sm">
                            <div className="flex justify-between w-full pb-2 border-b text-zinc-400 border-zinc-400">
                                <p>Title</p>
                                <p>Rating</p>
                            </div>
                            {album.tracks.items.map((track) => (
                                <div className="grid grid-cols-[4fr_1fr] px-2 items-center">
                                    <p className="py-1 rounded hover:bg-zinc-900">
                                        {track.name}
                                    </p>
                                    <div className="flex gap-1">
                                        <input type="radio" name="1" id="1" />
                                        <input type="radio" name="2" id="2" />
                                        <input type="radio" name="3" id="3" />
                                        <input type="radio" name="4" id="4" />
                                        <input type="radio" name="5" id="5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
