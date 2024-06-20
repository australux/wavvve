import { HTMLAttributes } from "react";

type ListProps = HTMLAttributes<HTMLUListElement>;

export const List = ({ children, ...props }: ListProps) => {
    return (
        <>
            <ul
                className="absolute z-50 flex flex-col w-full gap-2 py-4 px-2 mt-2 text-white border rounded-lg bg-zinc-950 border-zinc-500 top-full max-h-[calc(100vh_-_18rem)] overflow-hidden"
                {...props}
            >
                <div className="overflow-y-scroll">{children}</div>
            </ul>
        </>
    );
};
