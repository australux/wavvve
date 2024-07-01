type SelectorProps = {
    value: number;
    handleRating?: (e: React.MouseEvent) => void;
};

export const Selector = ({ value, handleRating }: SelectorProps) => {
    return (
        <div className="flex gap-1">
            <div
                className={`w-5 h-5 rounded-full ${
                    value >= 1 ? "bg-orange-400" : "bg-zinc-400"
                }`}
                id="1"
                onClick={handleRating}
            ></div>
            <div
                className={`w-5 h-5 rounded-full ${
                    value >= 2 ? "bg-orange-400" : "bg-zinc-400"
                }`}
                id="2"
                onClick={handleRating}
            ></div>
            <div
                className={`w-5 h-5 rounded-full ${
                    value >= 3 ? "bg-orange-400" : "bg-zinc-400"
                }`}
                id="3"
                onClick={handleRating}
            ></div>
            <div
                className={`w-5 h-5 rounded-full ${
                    value >= 4 ? "bg-orange-400" : "bg-zinc-400"
                }`}
                id="4"
                onClick={handleRating}
            ></div>
            <div
                className={`w-5 h-5 rounded-full ${
                    value >= 5 ? "bg-orange-400" : "bg-zinc-400"
                }`}
                id="5"
                onClick={handleRating}
            ></div>
        </div>
    );
};
