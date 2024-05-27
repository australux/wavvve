import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import * as React from "react";
// import { cva } from "class-variance-authority";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant: "dark" | "light";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, type, ...props }, ref) => {
        return (
            <>
                <input
                    type={type}
                    className={cn(inputVariants({ variant, className }))}
                    ref={ref}
                    {...props}
                />
            </>
        );
    }
);

export { Input };

const inputVariants = cva(
    "px-4 py-2 text-sm transition-colors bg-transparent border rounded-lg focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                dark: "text-white border-zinc-600 focus-visible:ring-zinc-300",
                light: "text-black border-zinc-400 focus-visible:ring-zinc-700",
            },
        },
        defaultVariants: {
            variant: "dark",
        },
    }
);
