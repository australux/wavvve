import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { AuthProvider } from "@/components/AuthProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/routes/Home.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/app",
        element: (
            <AuthProvider>
                <App />
            </AuthProvider>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
