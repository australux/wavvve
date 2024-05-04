import { cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

type InputProps = HTMLAttributes<HTMLInputElement> & {
    type: "text" | "password" | "checked";
    variant?: "dark" | "light";
};

export const Input = ({ type, variant, ...props }: InputProps) => {
    return (
        <>
            <input
                type={type}
                {...props}
                className={inputVariants({ variant })}
            />
        </>
    );
};

const inputVariants = cva("py-2 px-4", {
    variants: {
        variant: {
            dark: "",
            light: "",
        },
    },
    defaultVariants: {
        variant: "dark",
    },
});
