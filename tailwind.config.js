import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                abril: ["Abril Fatface", ...defaultTheme.fontFamily.serif],
                judson: ["Judson", ...defaultTheme.fontFamily.serif],
                manrope: ["Manrope", ...defaultTheme.fontFamily.sans],
                inter: ["Inter", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
