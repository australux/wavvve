import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { sdk } from "@/auth/sdk";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlbumCard } from "./components/AlbumCard";
import { Album } from "@spotify/web-api-ts-sdk";
import { Header } from "./components/Header";
import { TAlbum, TTrack } from "./types";
import { AlbumModal } from "./components/AlbumModal";
import { AlbumCardContext } from "./utils/context";

const queryClient = new QueryClient();

function App() {
    const { setItem, getItem, updateItem } = useLocalStorage("saved_albums");
    const [albumsList, setAlbumsList] = useState<TAlbum[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedAlbum, setSelectedAlbum] = useState<TAlbum>({} as TAlbum);
    const navigate = useNavigate();

    useEffect(() => {
        const saved_albums = getItem();
        if (!saved_albums) {
            setItem([]);
        }
        setAlbumsList(saved_albums);
    }, []);

    function logout() {
        sdk.logOut();
        navigate(0);
    }

    async function handleSelection(id: string) {
        const album: Album = await sdk.makeRequest("GET", `albums/${id}`);
        const formatedTracks: TTrack[] = album.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
        }));
        const formatedAlbum: TAlbum = {
            id: album.id,
            artists: album.artists,
            images: album.images,
            name: album.name,
            tracks: formatedTracks,
            rating: "G",
        };

        setAlbumsList([...albumsList, formatedAlbum]);
        setItem([...albumsList, formatedAlbum]);
    }

    function handleDelete(album: TAlbum) {
        const ID = album.id;
        const updatedList = albumsList.filter((album) => album.id !== ID);

        setAlbumsList(updatedList);
        setItem(updatedList);
    }

    function handleRating(id: string, rating: string) {
        updateItem(id, rating);
        const updatedList = albumsList.map((album) =>
            album.id === id ? { ...album, rating } : album
        );
        setAlbumsList(updatedList);
    }

    function handleShowModal(album: TAlbum) {
        setSelectedAlbum(album);
        setShowModal(true);
    }

    const albumContext = useMemo(() => selectedAlbum, [selectedAlbum]);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col items-center h-screen overflow-hidden antialiased text-black bg-zinc-50 font-inter scrollbar-none">
                <Header
                    sdk={sdk}
                    albumsList={albumsList}
                    setAlbumsList={setAlbumsList}
                    handleSelection={handleSelection}
                    logout={logout}
                />
                <main className="flex flex-col items-center w-full h-full overflow-y-auto scrollbar-none">
                    {albumsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4 antialiased font-josefin">
                            <h2 className="text-3xl font-bold">
                                Search some music
                            </h2>
                            <p className="text-zinc-400">
                                All your progress is saved locally in your
                                browser
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col mt-4">
                            <h2 className="pl-4 text-2xl antialiased font-bold font-josefin">
                                Your Albums
                            </h2>
                            <div className="flex flex-col w-full max-w-screen-xl gap-4 px-4 py-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                                {albumsList.map((album) => (
                                    <AlbumCardContext.Provider
                                        value={album}
                                        key={album.id}
                                    >
                                        <AlbumCard
                                            handleDelete={handleDelete}
                                            handleShowModal={handleShowModal}
                                            handleRating={handleRating}
                                        />
                                    </AlbumCardContext.Provider>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
            {showModal && selectedAlbum && (
                <div className="absolute top-0 left-0 z-50 hidden md:flex items-center justify-center w-screen h-screen bg-[#000000a6]">
                    <AlbumCardContext.Provider value={albumContext}>
                        <AlbumModal
                            setShowModal={setShowModal}
                            handleRating={handleRating}
                        />
                    </AlbumCardContext.Provider>
                </div>
            )}
        </QueryClientProvider>
    );
}

export default App;
