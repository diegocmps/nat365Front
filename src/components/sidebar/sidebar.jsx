import { Link } from "react-router-dom"
import './sidebar.css'

function SideBar() {
    return (
        <>
            <div className="sidebar">
                <legend>MENU</legend>
                <Link to='/'>Home</Link>
                <Link to='/localidade'>Cadastro Locais</Link>
            </div>
        </>
    )
}

export default SideBar