import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import SideBar from '../../components/sidebar/sidebar';
import './private.css';

export function TemplatePrivateRoute() {
    const { user } = useAuth();

    return user ? (
        <div className="layout">
            <SideBar />
            <main className='content'>
                <Outlet />
            </main>
        </div>
    ) : (
        <Navigate to='/' />
    );
}
