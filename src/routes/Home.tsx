import { Button } from "@/components/ui/Button";
import { Wavvve } from "@/components/ui/Svgs";

export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-zinc-900">
            <Wavvve className="fill-white w-96" />
            <h1 className="text-6xl antialiased text-yellow-50 font-judson">
                wavvve
            </h1>
            <h2 className="text-3xl antialiased text-yellow-50 font-abril">
                Track & Rate your music
            </h2>
            <Button>Get started</Button>
        </div>
    );
};
