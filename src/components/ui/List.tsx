import { HTMLAttributes } from "react";

type ListProps = HTMLAttributes<HTMLUListElement>;

export const List = ({ children, ...props }: ListProps) => {
    return (
        <>
            <ul
                className="absolute z-50 flex flex-col w-screen left-0 md:w-full gap-2 py-4 px-2 md:mt-2 text-white md:border rounded-lg bg-zinc-950 border-zinc-500 top-full h-[calc(100vh_-_4rem)] md:max-h-[calc(100vh_-_18rem)] overflow-hidden"
                {...props}
            >
                <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-thin">
                    {children}
                </div>
            </ul>
        </>
    );
};
