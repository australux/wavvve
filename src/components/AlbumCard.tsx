import { TAlbum } from "@/definitions";

export const AlbumCard = ({ album }: { album: TAlbum }) => {
    return (
        <div
            key={album.id}
            className="flex items-center gap-4 p-2 bg-black rounded-xl"
        >
            <div className="w-32 h-32 overflow-hidden rounded-lg">
                <img src={album.images[1].url} alt={album.id} />
            </div>
            <div className="flex flex-col h-full">
                <p className="text-lg ">{album.name}</p>
                <p className="text-sm text-zinc-500">
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
    );
};
