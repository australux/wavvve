import { Button } from "./ui/Button";
import { ChevronDown, ChevronUp, X } from "./ui/Svgs";
import { useState } from "react";
import { Track } from "./Track";
import { Pill } from "./ui/Pill";
import { Selector } from "./ui/Selector";
import { TAlbum } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type AlbumCardProps = {
    album: TAlbum;
    handleDelete: (album: TAlbum) => void;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedAlbum: React.Dispatch<React.SetStateAction<TAlbum>>;
};

export const AlbumCard = ({
    album,
    handleDelete,
    showModal,
    setShowModal,
    setSelectedAlbum,
}: AlbumCardProps) => {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [rating, setRating] = useState(album.rating);
    const { updateItem } = useLocalStorage("saved_albums");

    function handleRating(e: React.MouseEvent) {
        const newRating = e.currentTarget.id;
        updateItem(album.id, newRating);
        setRating(newRating);
    }

    function handleShowModal() {
        setSelectedAlbum(album);
        setShowModal(true);
    }

    return (
        <div>
            <div className="relative flex flex-col gap-2 p-2 bg-white hover:shadow-md">
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <p className="font-bold text-black line-clamp-1">
                            {album.name}
                        </p>
                        <p className="text-sm font-medium text-black line-clamp-1">
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
                    <div className="flex items-center gap-2">
                        <p
                            className={
                                (rating && !open) || (rating && !showModal)
                                    ? "text-lg font-black text-orange-400 opacity-100 transition-opacity duration-300"
                                    : "opacity-0"
                            }
                        >
                            <span className="md:hidden">{rating}</span>
                            <span className="hidden md:inline">
                                {album.rating}
                            </span>
                        </p>
                        <Button
                            onClick={() => handleDelete(album)}
                            variant="icon"
                        >
                            <X className="w-4 h-4 text-black stroke-2" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full overflow-hidden rounded aspect-custom">
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
                            ? "flex flex-col gap-2 p-2 rounded bg-zinc-50 w-full md:hidden max-h-full opacity-100 transition-all duration-300"
                            : "opacity-0 max-h-0"
                    }
                >
                    <p className="text-sm text-zinc-600">Rating</p>
                    <Selector value={rating} handleRating={handleRating} />
                    <div className="flex gap-2">
                        <Pill
                            toggle={toggle}
                            handleToggle={() => setToggle(!toggle)}
                        >
                            songs{" "}
                            {toggle ? (
                                <ChevronUp className="w-4 h-4 stroke-2" />
                            ) : (
                                <ChevronDown className="w-4 h-4 stroke-2" />
                            )}
                        </Pill>
                    </div>
                    {toggle && (
                        <>
                            <div className="flex flex-col w-full gap-2 text-xs md:text-sm">
                                <div className="flex justify-between w-full px-2 pb-2 border-b text-zinc-400 border-zinc-400">
                                    <p>Title</p>
                                    <p>Rating</p>
                                </div>
                                {album.tracks.map((track) => (
                                    <Track track={track} key={track.id} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="z-10 flex justify-end w-full h-full">
                    <div className="md:hidden" onClick={() => setOpen(!open)}>
                        <Button variant="icon">
                            {open ? (
                                <ChevronUp className="w-4 h-4 text-black stroke-2" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-black stroke-2" />
                            )}
                        </Button>
                    </div>
                    <div className="hidden md:flex">
                        <Button variant="icon" onClick={handleShowModal}>
                            <ChevronDown className="w-4 h-4 text-black stroke-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
