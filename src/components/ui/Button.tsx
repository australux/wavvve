import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    variant?: "dark" | "light" | "icon";
    className?: string;
};

export const Button = ({ variant, className, ...props }: ButtonProps) => {
    return (
        <>
            <button
                {...props}
                className={cn(buttonVariants({ variant }), className)}
            />
        </>
    );
};

const buttonVariants = cva(
    "inline-flex items-center justify-center px-4 py-2 transition-all duration-150 rounded-md shadow text-sm group",
    {
        variants: {
            variant: {
                dark: "bg-zinc-950 hover:bg-zinc-800 text-white",
                light: "bg-white hover:bg-zinc-100 text-black",
                icon: "p-1 rounded-full hover:bg-zinc-100 hover:opacity-75 shadow-none hover:shadow",
            },
        },
        defaultVariants: {
            variant: "dark",
        },
    }
);
