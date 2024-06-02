import Avvvatars from 'avvvatars-react';
import { useState } from 'react';
import { Link } from "react-router-dom";

export const Menu = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const  handleMenu = ()=>{
        setOpenMenu(!openMenu)
    }
  return (
    <div className="menu container">
        <h1>Flashcards</h1>
        <div className='profile'>
            <button onClick={handleMenu}>
                <Avvvatars 
                    value="yaider cordoba" 
                    size={45}
                    shadow={true}
                />
            </button>
            <ul className={openMenu ? 'profile__options open' : 'profile__options hide' } >
                <li><Link to='/profile'>Perfil</Link></li>
                <li><button>Salir</button></li>
            </ul>
        </div>
    </div>
  )
}
