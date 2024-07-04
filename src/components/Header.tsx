import { SpotifyApi, User } from "@spotify/web-api-ts-sdk";
import { SearchBar } from "./SearchBar";
import { Wavvve } from "./ui/Svgs";
import { Profile } from "./Profile";
import { SetStateAction, useEffect, useState } from "react";
import { TAlbum } from "@/types";

type HeaderProps = {
    sdk: SpotifyApi;
    albumsList: TAlbum[];
    setAlbumsList: React.Dispatch<SetStateAction<TAlbum[]>>;
    handleSelection: (id: string) => void;
    logout: () => void;
};

export const Header = ({
    sdk,
    albumsList,
    setAlbumsList,
    handleSelection,
    logout,
}: HeaderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUser() {
            const profile: User = await sdk.makeRequest("GET", "me");
            setUser(profile);
        }
        getUser();
    }, []);

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
