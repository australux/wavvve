import { User } from "@spotify/web-api-ts-sdk";

export const Profile = ({ user }: { user: User }) => {
    return (
        <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-500">
                {user.display_name}
            </p>
            <div className="flex items-center justify-center h-full overflow-hidden rounded-full bg-zinc-200 aspect-square">
                <img src={user.images[0].url} alt={user.id} loading="lazy" />
            </div>
        </div>
    );
};
