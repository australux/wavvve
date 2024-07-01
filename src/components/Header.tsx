import { Album, SpotifyApi, User } from "@spotify/web-api-ts-sdk";
import { SearchBar } from "./SearchBar";
import { Wavvve } from "./ui/Svgs";
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
        <header className="relative flex justify-center w-full h-16 p-2 bg-zinc-100">
            <div className="flex items-center justify-between w-full max-w-screen-xl gap-2 xl:px-4">
                <div className="flex items-center h-full">
                    <Wavvve />
                </div>
                <div className="flex justify-center w-full">
                    <SearchBar
                        sdk={sdk}
                        albumsList={albumsList}
                        setAlbumsList={setAlbumsList}
                        handleSelection={handleSelection}
                    />
                </div>
                <div className="w-16">
                    {user !== null && <Profile user={user} logout={logout} />}
                </div>
            </div>
        </header>
    );
};
