import { HTMLAttributes } from "react";

type SVGProps = HTMLAttributes<SVGElement>;

export const X = (props: SVGProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
        </>
    );
};

export const Fire = (props: SVGProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
            </svg>
        </>
    );
};

export const Trash = (props: SVGProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
            </svg>
        </>
    );
};

export const Star = (props: SVGProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
            </svg>
        </>
    );
};

export const Heart = (props: SVGProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>
        </>
    );
};

export const No = (props: SVGProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                />
            </svg>
        </>
    );
};

export const Wavvve = (props: SVGProps) => {
    return (
        <>
            <svg
                width="104"
                height="34"
                viewBox="0 0 104 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    d="M2.32814 6.5553C1.04235 5.51036 0.84709 3.62092 1.89203 2.33513C2.93697 1.04933 4.82581 0.853598 6.1116 1.89854C9.76888 4.87073 16.9734 10.7257 22.1105 14.9005C27.2476 19.0753 34.4521 24.9302 38.1094 27.9024C39.3952 28.9474 39.5899 30.8363 38.5449 32.1221C37.5 33.4079 35.6105 33.6032 34.3247 32.5582L18.3264 19.5568L2.32814 6.5553Z"
                    fill="#A70D60"
                    fill-opacity="0.85"
                />
                <rect
                    x="63.9914"
                    y="4.65628"
                    width="6"
                    height="47.2334"
                    rx="3"
                    transform="rotate(-50.9 63.9914 4.65628)"
                    fill="#A70D60"
                    fill-opacity="0.85"
                />
                <rect
                    x="31.9938"
                    y="4.65828"
                    width="6"
                    height="47.231"
                    rx="3"
                    transform="rotate(-50.9 31.9938 4.65828)"
                    fill="#A70D60"
                    fill-opacity="0.85"
                />
                <rect
                    x="65.212"
                    y="1.22335"
                    width="6"
                    height="32"
                    rx="3"
                    fill="#FF8717"
                    fill-opacity="0.85"
                />
                <rect
                    x="33.212"
                    y="1.22335"
                    width="6"
                    height="32"
                    rx="3"
                    fill="#FF8717"
                    fill-opacity="0.85"
                />
                <rect
                    x="97.212"
                    y="1.22335"
                    width="6"
                    height="32"
                    rx="3"
                    fill="#FF8717"
                    fill-opacity="0.85"
                />
            </svg>
        </>
    );
};
