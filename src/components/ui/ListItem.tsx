import { HTMLAttributes } from "react";

type ListItemProps = HTMLAttributes<HTMLLIElement>;

export const ListItem = ({ children, ...props }: ListItemProps) => {
    return (
        <li
            className="p-2 rounded-md hover:bg-zinc-900 hover:cursor-pointer"
            {...props}
        >
            {children}
        </li>
    );
};
