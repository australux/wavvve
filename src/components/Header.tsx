import { Album, SpotifyApi, User } from "@spotify/web-api-ts-sdk";
import { SearchBar } from "./SearchBar";
import { WavvveBW } from "./ui/Svgs";
import { Profile } from "./Profile";
import { SetStateAction } from "react";

type HeaderProps = {
    sdk: SpotifyApi;
    albumsList: Album[];
    setAlbumsList: React.Dispatch<SetStateAction<Album[]>>;
    handleSelection: (id: string) => void;
    user: User | null;
    logout: () => void;
};

export const Header = ({
    sdk,
    albumsList,
    setAlbumsList,
    handleSelection,
    user,
    logout,
}: HeaderProps) => {
    return (
        <header className="flex items-center justify-between w-full h-16 gap-4 p-2 lg:py-2 lg:px-8 bg-zinc-100">
            <div className="flex w-14">
                <WavvveBW />
            </div>
            <div className="flex justify-center w-full lg:w-1/2">
                <SearchBar
                    sdk={sdk}
                    albumsList={albumsList}
                    setAlbumsList={setAlbumsList}
                    handleSelection={handleSelection}
                />
            </div>
            <div>
                {user !== null && <Profile user={user} logout={logout} />}
            </div>
        </header>
    );
};
