import { cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    variant?: "dark" | "light";
};

export const Button = ({ variant, ...props }: ButtonProps) => {
    return (
        <>
            <button {...props} className={buttonVariants({ variant })} />
        </>
    );
};

const buttonVariants = cva(
    "inline-flex px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-md shadow",
    {
        variants: {
            variant: {
                dark: "bg-zinc-950 hover:bg-zinc-800 text-white",
                light: "bg-white hover:bg-zinc-100 text-black",
            },
        },
        defaultVariants: {
            variant: "dark",
        },
    }
);
