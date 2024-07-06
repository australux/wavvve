import { Button } from "@/components/ui/Button";
import { Selector } from "@/components/ui/Selector";
import { X } from "@/components/ui/Svgs";
import { Track } from "./Track";
import { useState } from "react";
import { useAlbumContext } from "@/utils/context";

export const AlbumModal = ({
    setShowModal,
    handleRating,
}: {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleRating: (id: string, rating: string) => void;
}) => {
    const album = useAlbumContext();
    const [rating, setRating] = useState(album.rating);

    function updateRating(e: React.MouseEvent) {
        const newRating = e.currentTarget.id;
        handleRating(album.id, newRating);
        setRating(newRating);
    }

    return (
        <div className="flex gap-6 p-2 bg-white">
            <div className="flex flex-col justify-between h-[500px]">
                <div className="w-[290px] h-[290px] lg:w-[500px] lg:h-[500px] bg-black rounded">
                    <img
                        src={album.images[0].url}
                        alt={album.id}
                        height={600}
                        width={600}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col lg:hidden">
                    <p className="font-bold text-[32px]">{album.name}</p>
                    <p className="text-lg font-medium">
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
            <div className="w-[290px] flex flex-col lg:gap-6 h-[500px]">
                <div className="items-start justify-between hidden w-full lg:flex">
                    <div className="flex flex-col">
                        <p className="font-bold text-[32px]">{album.name}</p>
                        <p className="text-lg font-medium">
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
                        <Button
                            onClick={() => setShowModal(false)}
                            variant="icon"
                        >
                            <X className="w-5 h-5 text-black stroke-2" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4 overflow-hidden">
                    <div className="flex justify-between w-full lg:hidden">
                        <p className="text-zinc-600">Rating</p>
                        <Button
                            onClick={() => setShowModal(false)}
                            variant="icon"
                        >
                            <X className="w-5 h-5 text-black stroke-2" />
                        </Button>
                    </div>
                    <p className="hidden text-zinc-600 lg:block">Rating</p>
                    <Selector value={rating} handleRating={updateRating} />
                    <div className="flex flex-col w-full gap-2 overflow-hidden text-xs md:text-sm">
                        <div className="flex justify-between w-full px-2 pb-2 border-b text-zinc-400 border-zinc-400">
                            <p>Title</p>
                            <p>Rating</p>
                        </div>
                        <div className="w-full h-full overflow-y-scroll h-ful scrollbar-thin">
                            {album.tracks.map((track) => (
                                <Track track={track} key={track.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
