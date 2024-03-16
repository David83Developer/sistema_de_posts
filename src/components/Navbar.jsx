import './ComponentsStyle.css'
import { FaHouseUser, FaSignOutAlt, FaToolbox, FaInfo } from 'react-icons/fa'

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthUser";


function Navbar() {

    const {signout} = useContext(AuthContext)

    return ( 
        <nav>
            <div className="titulo">
                <FaHouseUser
                onClick={()=> scrollTo({top, behavior:"smooth"})}
                />
                <h2>NOME DO SITE</h2>
            </div>
           
            <ul>
                <li>Informações <FaInfo/></li>
                <li>Configurações <FaToolbox/></li>
                <li onClick={signout}>Signout <FaSignOutAlt/></li>
            </ul>
        </nav>
     );
}

export default Navbar
