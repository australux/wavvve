type PillProps = {
    text: string;
    toggle: string;
    handleToggle: (e: React.MouseEvent) => void;
};

export const Pill = ({ text, toggle, handleToggle }: PillProps) => {
    return (
        <div
            className={`px-2 py-1 text-xs hover:cursor-pointer rounded-xl transition-colors duration-100 ${
                toggle === text ? "bg-orange-400 text-white" : "text-zinc-400"
            }`}
            onClick={handleToggle}
            id={text}
        >
            {text}
        </div>
    );
};
