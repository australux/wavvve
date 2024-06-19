import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { X } from "./ui/Svgs";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useState } from "react";
import { List } from "./ui/List";
import { ListItem } from "./ui/ListItem";
import { TAlbum } from "@/definitions";
import { SuggestionCard } from "./SuggestionCard";

type SearchBarProps = {
    sdk: SpotifyApi;
    albumsList: TAlbum[];
    setAlbumsList: React.Dispatch<React.SetStateAction<TAlbum[]>>;
    handleSelection: (data: TAlbum) => void;
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

    function handleClick(album: TAlbum) {
        handleSelection(album);
    }

    const { data: results, isLoading } = useQuery({
        queryFn: () => fetchSearch(q),
        queryKey: ["search", q],
    });

    return (
        <div className="relative">
            <form onSubmit={(e) => e.preventDefault()} className="">
                <div className="flex items-center gap-2">
                    <label htmlFor="searchbar" className="hidden"></label>
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
            {inputValue && (
                <List>
                    {isLoading ? (
                        <ListItem>Loading</ListItem>
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
