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
            <div className="grid grid-cols-[1fr_2fr] gap-4 p-2 bg-black rounded-xl shadow-md relative">
                <div className="overflow-hidden rounded-lg w-44 h-5w-44">
                    <img src={album.images[1].url} alt={album.id} />
                </div>
                <div className="flex flex-col h-full pr-8">
                    <p className="text-lg font-semibold text-zinc-100 line-clamp-3">
                        {album.name}
                    </p>
                    <p className="text-sm text-zinc-400">
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
                    <div className="absolute z-40 flex flex-col w-full gap-1 p-2 mt-2 bg-black rounded-xl top-full">
                        {album.tracks.items.map((track) => (
                            <p className="p-2 py-1 text-sm rounded hover:bg-zinc-900">
                                {track.name}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
