import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Spinner, X } from "./ui/Svgs";
import { SimplifiedAlbum, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useState } from "react";
import { List } from "./ui/List";
import { ListItem } from "./ui/ListItem";
import { SuggestionCard } from "./SuggestionCard";
import { TAlbum } from "@/types";

type SearchBarProps = {
    sdk: SpotifyApi;
    albumsList: TAlbum[];
    setAlbumsList: React.Dispatch<React.SetStateAction<TAlbum[]>>;
    handleSelection: (id: string) => void;
};

export const SearchBar = ({ sdk, handleSelection }: SearchBarProps) => {
    const [q, setQ] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

    async function fetchSearch(q: string) {
        if (!q) throw new Error("no search querry");
        const res = await sdk.search(
            q,
            ["album", "artist", "track"],
            undefined
        );
        // console.log("fetching...", res);
        return res;
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
        <div className="w-full max-w-[500px] sm:relative">
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
                        placeholder="Search"
                    />
                    <button type="submit" hidden></button>
                    {q && (
                        <div className="absolute right-1 top-1">
                            <Button
                                variant="icon"
                                className="p-1 shadow-none"
                                onClick={() => setInputValue("")}
                            >
                                <X className="w-6 text-zinc-600" />
                            </Button>
                        </div>
                    )}
                </div>
            </form>
            {q && (
                <List>
                    {isLoading ? (
                        <ListItem>
                            <Spinner />
                        </ListItem>
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
