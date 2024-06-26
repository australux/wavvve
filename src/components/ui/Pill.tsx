type PillProps = {
    text: string;
    toggle: string;
    handleToggle: (e: React.MouseEvent) => void;
};

export const Pill = ({ text, toggle, handleToggle }: PillProps) => {
    return (
        <div
            className={`px-2 py-1 text-xs hover:cursor-pointer rounded-xl ${
                toggle === text && "bg-zinc-800"
            }`}
            onClick={handleToggle}
            id={text}
        >
            {text}
        </div>
    );
};
