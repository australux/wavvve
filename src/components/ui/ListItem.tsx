import { HTMLAttributes } from "react";

type ListItemProps = HTMLAttributes<HTMLLIElement>;

export const ListItem = ({ children, ...props }: ListItemProps) => {
    return (
        <li
            className="px-2 py-1 rounded-md hover:bg-zinc-900 hover:cursor-pointer"
            {...props}
        >
            {children}
        </li>
    );
};
