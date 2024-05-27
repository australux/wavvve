import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { sdk } from "@/auth/sdk";
import { TAlbum } from "@/definitions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/Button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    const [albumsList, setAlbumsList] = useState<TAlbum[]>([]);

    const navigate = useNavigate();
    const { setItem, getItem } = useLocalStorage("saved_albums");

    useEffect(() => {
        const saved_albums = getItem();

        if (!saved_albums) {
            throw new Error("No saved albums");
        }

        setAlbumsList(saved_albums);
    }, []);

    function logout() {
        sdk.logOut();
        navigate(0);
    }

    function handleDelete(album: TAlbum) {
        const ID = album.id;
        const updatedList = albumsList.filter((album) => album.id === ID);

        setAlbumsList(updatedList);
        setItem(updatedList);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <main className="flex flex-col items-center h-screen text-white bg-zinc-800">
                <header className="flex items-center justify-between w-full h-16 px-8 bg-zinc-100">
                    <Button variant="light" onClick={logout}>
                        Logout
                    </Button>
                    <SearchBar sdk={sdk} />
                    <Button onClick={() => handleDelete}>Delete</Button>
                </header>
            </main>
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
