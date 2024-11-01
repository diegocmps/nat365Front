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

<<<<<<< HEAD
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
=======

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Signin />
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    },
    {
        path: '/cadastro',
        element: <CadastroPage />
    },
    {
<<<<<<< HEAD
        path: '/login',
        element: <Signin />
    },
    {
        path: '/',
        element: <TemplatePrivateRoute />,
        children: [
            {
=======
        path: '/dashboard',
        element: <TemplatePrivateRoute />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                path: 'localidade',
                element: <CadastroLocais />
            },
            {
                path: 'localidade/:id',
                element: <PaginaEditarLocal />
            },
            {
<<<<<<< HEAD
                path: 'localidade/detalhes/:localId',
=======
                path: 'localidade/detalhes/:id',
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
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
