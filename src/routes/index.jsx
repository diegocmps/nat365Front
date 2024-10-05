import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/signin/signin";
import { CadastroPage } from "../pages/cadastro";
import { TemplatePrivateRoute } from "../template/private";
import { CadastroLocais } from "../pages/localidades";
import { List } from "../pages/lista/list";
import { HomePage } from "../pages/dashboard";
import { PaginaEditarLocal } from "../pages/editarLocal";
import { LocalDetalhes } from "../pages/LocalDetalhes";
import { UserProfile } from "../pages/UserProfile";
import { EditUserProfile } from "../pages/EditUserProfile";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/cadastro',
        element: <CadastroPage />
    },
    {
        path: '/login',
        element: <Signin />
    },
    {
        path: '/',
        element: <TemplatePrivateRoute />,
        children: [
            {
                path: 'localidade',
                element: <CadastroLocais />
            },
            {
                path: 'localidade/:id',
                element: <PaginaEditarLocal />
            },
            {
                path: 'localidade/detalhes/:localId',
                element: <LocalDetalhes />
            },
            {
                path: 'user/:id',
                element: <UserProfile />
            },
            {
                path: 'user/editar/:id',
                element: <EditUserProfile />
            },
            {
                path: 'list',
                element: <List />
            }
        ]
    }
]);
