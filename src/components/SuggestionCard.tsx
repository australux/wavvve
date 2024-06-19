import { TAlbum } from "@/definitions";

type SugsestionProps = React.HTMLAttributes<HTMLDivElement> & {
    album: TAlbum;
};

export const SuggestionCard = ({ album, ...props }: SugsestionProps) => {
    return (
        <div
            {...props}
            className="grid grid-cols-[1fr_2fr] w-full gap-2 text-sm"
        >
            <div className="w-full h-full overflow-hidden rounded-md aspect-square">
                <img src={album.images[1].url} alt={album.id} />
            </div>
            <div className="flex items-center">
                <p className="line-clamp-2">{album.name}</p>
            </div>
        </div>
    );
};
