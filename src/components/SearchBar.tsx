import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { X } from "./ui/Svgs";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useState } from "react";

export const SearchBar = ({ sdk }: { sdk: SpotifyApi }) => {
    const [q, setQ] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

    async function fetchSearch(q: string) {
        if (!q) return;
        const res = await sdk.search(
            q,
            ["album", "artist", "track"],
            undefined,
            2
        );
        console.log("fetching...", res);
        return res;
        // setResults(res);
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
        setTimeout(() => {
            setQ(e.target.value);
        }, 200);
    }

    const { data: results, isLoading } = useQuery({
        queryFn: () => fetchSearch(q),
        queryKey: ["search", q],
    });

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center gap-2">
                    <label htmlFor="searchbar"></label>
                    <Input
                        type="text"
                        id="searchbar"
                        variant="light"
                        value={inputValue}
                        onChange={handleInput}
                    />
                    <button type="submit" hidden></button>
                    <div>
                        <Button>
                            <X />
                        </Button>
                    </div>
                </div>
            </form>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                results?.albums.items.map((album) => (
                    <div key={album.id}>{album.name}</div>
                ))
            )}
        </div>
    );
};
