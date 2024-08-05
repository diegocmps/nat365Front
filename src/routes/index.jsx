import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/signin/signin";
import { CadastroPage } from "../pages/cadastro";
import { TemplatePrivateRoute } from "../template/private";
import { CadastroLocais } from "../pages/localidades";



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
        element: <TemplatePrivateRoute />,

    },
    {
        path: '/localidade',
        element: <CadastroLocais/>
    }


])