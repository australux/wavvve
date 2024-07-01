import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { sdk } from "@/auth/sdk";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlbumCard } from "./components/AlbumCard";
import { Album, User } from "@spotify/web-api-ts-sdk";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

function App() {
    const [albumsList, setAlbumsList] = useState<Album[]>([]);
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();
    const { setItem, getItem } = useLocalStorage("saved_albums");

    useEffect(() => {
        async function getUser() {
            const profile: User = await sdk.makeRequest("GET", "me");

            setUser(profile);
        }

        const saved_albums = getItem();

        if (!saved_albums) {
            setItem([]);
            // throw new Error("No saved albums");
        }

        getUser();
        setAlbumsList(saved_albums);
    }, []);

    function logout() {
        sdk.logOut();
        navigate(0);
    }

    async function handleSelection(id: string) {
        const album: Album = await sdk.makeRequest("GET", `albums/${id}`);
        setAlbumsList([...albumsList, album]);
        setItem([...albumsList, album]);
    }

    function handleDelete(album: Album) {
        const ID = album.id;
        const updatedList = albumsList.filter((album) => album.id !== ID);

        setAlbumsList(updatedList);
        setItem(updatedList);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col items-center h-screen overflow-hidden antialiased text-black bg-zinc-50 font-inter scrollbar-none">
                <Header
                    sdk={sdk}
                    albumsList={albumsList}
                    setAlbumsList={setAlbumsList}
                    handleSelection={handleSelection}
                    user={user}
                    logout={logout}
                />
                <main className="flex flex-col items-center w-full h-full overflow-y-auto scrollbar-none">
                    {albumsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                            <h2 className="text-3xl font-medium">
                                Start searching music
                            </h2>
                            <p className="text-zinc-400">
                                Add albums and songs to your timeline
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col mt-4">
                            <h2 className="text-[32px] font-bold pl-4">
                                Your Albums
                            </h2>
                            <div className="flex flex-col w-full max-w-screen-xl gap-4 px-4 py-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                                {albumsList.map((album) => (
                                    <AlbumCard
                                        album={album}
                                        handleDelete={handleDelete}
                                        key={album.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </QueryClientProvider>
    );
}

export default App;
