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
            className="relative flex items-center gap-2 hover:cursor-pointer"
            onClick={toggleActions}
        >
            <p className="hidden text-sm font-semibold text-zinc-500 md:inline">
                {user.display_name}
            </p>
            <div className="flex items-center justify-center h-[40px] overflow-hidden rounded-full bg-zinc-200 aspect-square">
                <img src={user.images[0].url} alt={user.id} loading="lazy" />
            </div>
            {open && (
                <div className="absolute right-0 z-30 min-w-full p-2 mt-2 border rounded-lg top-full bg-zinc-950 border-zinc-500">
                    <Button variant="light" onClick={logout}>
                        Logout
                    </Button>
                </div>
            )}
        </div>
    );
};
