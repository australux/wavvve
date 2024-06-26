import { User } from "@spotify/web-api-ts-sdk";
import { Button } from "./ui/Button";
import { useState } from "react";

type ProfileProps = {
    user: User;
    logout: () => void;
};

export const Profile = ({ user, logout }: ProfileProps) => {
    const [open, setOpen] = useState(false);

    function toggleActions() {
        setOpen(!open);
    }

    return (
        <div
            className="relative flex items-center justify-end gap-2 hover:cursor-pointer"
            onClick={toggleActions}
        >
            <div className="flex items-end justify-center h-[40px] overflow-hidden rounded-full bg-zinc-200 aspect-square">
                <img src={user.images[0].url} alt={user.id} loading="lazy" />
            </div>
            {open && (
                <div className="absolute right-0 z-30 flex flex-col items-end min-w-full gap-4 p-2 mt-2 border rounded-lg top-full bg-zinc-950 border-zinc-500">
                    <p className="text-sm font-semibold text-zinc-500 line-clamp-1">
                        {user.display_name}
                    </p>
                    <Button variant="light" onClick={logout}>
                        Logout
                    </Button>
                </div>
            )}
        </div>
    );
};
