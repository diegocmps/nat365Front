import { Navigate, Outlet } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/auth'
import SideBar from '../../components/sidebar/sidebar'


useAuth

export function TemplatePrivateRoute() {

    const { user, signOut } = useAuth()

    return user ? (
        <div>
            <nav className="navbar navbar-dark bg-dark" aria-label="First navbar example">
                <div className="container max-auto">
                    <a className="navbar-brand" href="#">NATUREZA365 - DASHBOARD</a>
                </div>

                <div>
                    <button className=' btn btn-dark' onClick={signOut}>
                        <LogOut size={16} />
                    </button>

                </div>
            </nav>
            <SideBar/>
            
            <main className='container mx-auto'>
                <Outlet />
            </main>
        </div>
    ) : <Navigate to='/'/>
}