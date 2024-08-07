import { Link } from "react-router-dom"
import './sidebar.css'
import { useAuth } from "../../contexts/auth"
import { LogOut } from 'lucide-react'


function SideBar() {

    const { signOut } = useAuth()


    return (
        <>
            <div className="sidebar">
                <legend>MENU</legend>
                <Link to="/dashboard">Home</Link>
                <Link to="/dashboard/localidade">Cadastro Locais</Link>
                <Link to="/dashboard/list">Lista de Locais</Link>
                <div>
                    <button className=' btn btn-dark' onClick={signOut}>
                        <LogOut size={16} />
                    </button>

                </div>
            </div>
        </>
    )
}

export default SideBar