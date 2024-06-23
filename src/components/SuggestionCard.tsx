import { SimplifiedAlbum } from "@spotify/web-api-ts-sdk";

type SugsestionProps = React.HTMLAttributes<HTMLDivElement> & {
    album: SimplifiedAlbum;
};

export const SuggestionCard = ({ album, ...props }: SugsestionProps) => {
    return (
        <div
            {...props}
            className="grid grid-cols-[1fr_3fr] w-full gap-2 text-sm"
        >
            <div className="w-[80px] h-[80px] overflow-hidden rounded-md aspect-square">
                <img src={album.images[1].url} alt={album.id} />
            </div>
            <div className="flex items-center w-full overflow-hidden">
                <p className="line-clamp-2">{album.name}</p>
            </div>
        </div>
    );
};
