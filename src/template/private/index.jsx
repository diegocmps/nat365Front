import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/auth"

export function PrivateRouteLayout() {
    const { user } = useAuth
    return user ? (
        <div className="styles.container">
            <aside className="styles.sidebar"></aside>
        </div>
    ) : <Navigate to='/login'/>
}