import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/signin/signin";
import { HomePage } from "../pages/signin/dashboard";
import { CadastroPage } from "../pages/cadastro";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Signin />
    },
    {
        path: '/cadastro',
        element: <CadastroPage />
    },
    {
        path: '/dashboard',
        element: <HomePage />
    }

])