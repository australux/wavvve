import { sdk } from "@/auth/sdk";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Promise<UserProfile> | null>(null);

    useEffect(() => {
        async function getUser() {
            return await sdk.currentUser.profile();
        }
        const user_profile = getUser();
        setUser(user_profile);
    }, []);

    return user ? <>{children}</> : null;
};
