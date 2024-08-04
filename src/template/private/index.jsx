import { Navigate, Outlet } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '../../contexts/auth'


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
                    <span className='text-secondary'><User size={16}/>{user.email}</span>
                    <button className=' btn btn-dark' onClick={signOut}>
                        <LogOut size={16} />
                    </button>

                </div>
            </nav>
            <main className='container mx-auto'>
                <Outlet />
            </main>
        </div>
    ) : <Navigate to='/'/>
}