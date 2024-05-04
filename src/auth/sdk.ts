import { Scopes } from "@/Scopes";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_TARGET = import.meta.env.VITE_REDIRECT_TARGET;

const sdk = SpotifyApi.withUserAuthorization(
    CLIENT_ID,
    REDIRECT_TARGET,
    Scopes.userDetails
);

export { sdk, CLIENT_ID, REDIRECT_TARGET };
