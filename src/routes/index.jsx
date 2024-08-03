import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/signin/signin";
import { HomePage } from "../pages/signin/dashboard";

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Signin />
    },
    {
        path: '/dashboard',
        element: <HomePage />
    }

])