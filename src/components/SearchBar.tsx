import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { X } from "./ui/Svgs";
import { Album, SimplifiedAlbum, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useState } from "react";
import { List } from "./ui/List";
import { ListItem } from "./ui/ListItem";
import { SuggestionCard } from "./SuggestionCard";

type SearchBarProps = {
    sdk: SpotifyApi;
    albumsList: Album[];
    setAlbumsList: React.Dispatch<React.SetStateAction<Album[]>>;
    handleSelection: (id: string) => void;
};

export const SearchBar = ({ sdk, handleSelection }: SearchBarProps) => {
    const [q, setQ] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

    async function fetchSearch(q: string) {
        if (!q) return;
        const res = await sdk.search(
            q,
            ["album", "artist", "track"],
            undefined
        );
        // console.log("fetching...", res);
        return res;
        // setResults(res);
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
        setTimeout(() => {
            setQ(e.target.value);
        }, 200);
    }

    function handleBlur() {
        setTimeout(() => {
            setQ("");
        }, 200);
    }

    function handleFocus() {
        setQ(inputValue);
    }

    function handleClick(album: SimplifiedAlbum) {
        handleSelection(album.id);
        setInputValue("");
    }

    const { data: results, isLoading } = useQuery({
        queryFn: () => fetchSearch(q),
        queryKey: ["search", q],
    });

    return (
        <div className="w-full md:relative lg:w-1/2">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex items-center gap-2">
                    <label htmlFor="searchbar" className="hidden"></label>
                    <Input
                        type="text"
                        id="searchbar"
                        variant="light"
                        value={inputValue}
                        onChange={handleInput}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        className="w-full"
                    />
                    <button type="submit" hidden></button>
                    {q && (
                        <div className="absolute right-1 top-1">
                            <Button
                                variant="icon"
                                className="p-1 shadow-none"
                                onClick={() => setInputValue("")}
                            >
                                <X className="w-6 text-zinc-500 group-hover:text-zinc-100" />
                            </Button>
                        </div>
                    )}
                </div>
            </form>
            {q && (
                <List>
                    {isLoading ? (
                        <ListItem>Loading...</ListItem>
                    ) : (
                        results?.albums.items.map((album) => (
                            <ListItem
                                key={album.id}
                                onClick={() => handleClick(album)}
                            >
                                <SuggestionCard album={album} />
                            </ListItem>
                        ))
                    )}
                </List>
            )}
        </div>
    );
};
