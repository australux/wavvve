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
            throw new Error("No saved albums");
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
            <div className="flex flex-col items-center h-screen overflow-hidden text-white bg-zinc-900 font-inter scrollbar-none">
                <Header
                    sdk={sdk}
                    albumsList={albumsList}
                    setAlbumsList={setAlbumsList}
                    handleSelection={handleSelection}
                    user={user}
                    logout={logout}
                />
                <main className="flex flex-col items-center w-full h-full overflow-y-auto scrollbar-none">
                    <div className="flex flex-col w-full gap-4 px-4 py-4 md:gap-8 lg:w-2/3 md:grid md:grid-cols-2">
                        {albumsList.map((album) => (
                            <AlbumCard
                                album={album}
                                handleDelete={handleDelete}
                                key={album.id}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </QueryClientProvider>
    );
}

export default App;

// function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
//     const [results, setResults] = useState<SearchResults<["artist"]>>(
//         {} as SearchResults<["artist"]>
//     );

//     useEffect(() => {
//         (async () => {
//             const results = await sdk.search("The Beatles", ["artist"]);
//             setResults(() => results);
//         })();
//     }, [sdk]);

//     // generate a table for the results
//     const tableRows = results.artists?.items.map((artist) => {
//         return (
//             <tr key={artist.id}>
//                 <td>{artist.name}</td>
//                 <td>{artist.popularity}</td>
//                 <td>{artist.followers.total}</td>
//             </tr>
//         );
//     });

//     return (
//         <>
//             <h1>Spotify Search for The Beatles</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Popularity</th>
//                         <th>Followers</th>
//                     </tr>
//                 </thead>
//                 <tbody>{tableRows}</tbody>
//             </table>
//         </>
//     );
// }
