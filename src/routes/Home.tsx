import { Button } from "@/components/ui/Button";
import { Wavvve } from "@/components/ui/Svgs";

export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8 bg-zinc-900">
            <div className="inline-flex items-center gap-2">
                <Wavvve />
                <h1 className="pb-3 text-6xl antialiased text-yellow-50 font-judson">
                    wavvve
                </h1>
            </div>
            <h2 className="text-3xl antialiased text-yellow-50 font-abril">
                Track & Rate your music
            </h2>
            <a href="/app">
                <Button>Get started</Button>
            </a>
        </div>
    );
};
